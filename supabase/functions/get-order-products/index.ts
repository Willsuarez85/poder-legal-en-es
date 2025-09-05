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
    // Create Supabase service client for security functions
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { orderId, accessToken } = await req.json();

    if (!orderId) {
      return new Response(
        JSON.stringify({ error: "Order ID is required" }),
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

    console.log("Checking access for order:", orderId);

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
      console.warn("Access denied:", accessCheck?.reason, "for order:", orderId);
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

    console.log("Access granted for order:", orderId);

    // Get order details
    const { data: order, error: orderError } = await supabaseService
      .from("orders")
      .select("product_ids, customer_email")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      console.error("Order not found:", orderError);
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!order.product_ids || order.product_ids.length === 0) {
      return new Response(
        JSON.stringify({ products: [] }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Found product IDs:", order.product_ids);

    // Get product details for all products in the order
    const { data: products, error: productsError } = await supabaseService
      .from("products")
      .select("id, name, label, state, price")
      .in("id", order.product_ids);

    if (productsError) {
      console.error("Failed to load products:", productsError);
      return new Response(
        JSON.stringify({ error: "Failed to load products" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Retrieved products:", products);

    return new Response(
      JSON.stringify({ products: products || [] }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in get-order-products function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});