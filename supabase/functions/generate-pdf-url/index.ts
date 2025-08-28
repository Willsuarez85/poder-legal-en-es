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
    // Create Supabase client with service role key for admin access
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { orderId, productId } = await req.json();

    if (!orderId || !productId) {
      return new Response(
        JSON.stringify({ error: "Order ID and Product ID are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify the order exists and contains the requested product
    const { data: order, error: orderError } = await supabaseAdmin
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
    const { data: product, error: productError } = await supabaseAdmin
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
    // Handle special case for Texas files that use "texas" instead of "tx" in filename
    const filePrefix = product.state === 'tx' ? 'texas' : product.state;
    const filePath = `${product.state}/${filePrefix}-${product.label}.pdf`;
    console.log("Attempting to generate signed URL for file:", filePath);
    console.log("Product details:", { state: product.state, label: product.label, filePrefix });

    // Generate signed URL (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin
      .storage
      .from("poder-legal")
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    if (signedUrlError) {
      console.error("Failed to generate signed URL:", signedUrlError);
      console.error("File path that failed:", filePath);
      
      // List available files for debugging
      const { data: files, error: listError } = await supabaseAdmin
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
        expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
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