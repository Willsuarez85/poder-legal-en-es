import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, productId, accessToken } = await req.json();

    if (!orderId || !productId) {
      return new Response(
        JSON.stringify({ error: "Order ID and Product ID are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Access token is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create Supabase service client for security functions
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    console.log("Checking access for download...");

    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for") || 
                    req.headers.get("x-real-ip") || 
                    "127.0.0.1";

    // Use enhanced security check with rate limiting
    const { data: accessCheck, error: accessError } = await supabaseService
      .rpc('check_order_access_rate_limit', {
        p_order_id: orderId,
        p_access_token: accessToken,
        p_ip_address: clientIP
      });

    if (accessError) {
      console.error("Access check failed:", accessError);
      return new Response(
        JSON.stringify({ error: "Security check failed" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!accessCheck?.allowed) {
      console.warn("Download access denied:", accessCheck?.reason, "for order:", orderId);
      return new Response(
        JSON.stringify({ 
          error: accessCheck?.message || "Access denied",
          reason: accessCheck?.reason 
        }),
        {
          status: accessCheck?.reason === 'rate_limit_exceeded' ? 429 : 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Download access granted for order:", orderId);

    // Verify order exists and get product details
    const { data: order, error: orderError } = await supabaseService
      .from("orders")
      .select("product_ids, stripe_session_id")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      console.error("Order verification failed:", orderError);
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if the product is in the order
    if (!order.product_ids || !order.product_ids.includes(productId)) {
      return new Response(
        JSON.stringify({ error: "Product not found in order" }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get product details to construct file path
    const { data: product, error: productError } = await supabaseService
      .from("products")
      .select("state, label")
      .eq("id", productId)
      .single();

    if (productError || !product) {
      console.error("Product not found:", productError);
      return new Response(
        JSON.stringify({ error: "Product details not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!product.label) {
      return new Response(
        JSON.stringify({ error: "Product label not configured" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Construct file path: {state}/{state-label}.pdf
    const filePath = `${product.state}/${product.state}-${product.label}.pdf`;
    console.log("Attempting to generate signed URL for file:", filePath);
    console.log("Product details:", { state: product.state, label: product.label });

    // Generate signed URL (valid for 1 hour for security)
    const { data: signedUrlData, error: signedUrlError } = await supabaseService
      .storage
      .from("poder-legal")
      .createSignedUrl(filePath, 3600); // 1 hour expiry for better security

    if (signedUrlError) {
      console.error("Failed to generate signed URL:", signedUrlError);
      console.error("File path that failed:", filePath);
      
      // List available files for debugging
      const { data: files, error: listError } = await supabaseService
        .storage
        .from("poder-legal")
        .list(product.state, { limit: 10 });
      
      console.error("Available files in", product.state, ":", files);
      console.error("List error:", listError);
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to generate download URL",
          details: signedUrlError.message,
          filePath: filePath,
          availableFiles: files
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        downloadUrl: signedUrlData.signedUrl,
        expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour from now for security
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in generate-pdf-url function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});