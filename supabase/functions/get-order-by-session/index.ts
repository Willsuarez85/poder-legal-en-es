import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-ORDER-BY-SESSION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const { sessionId } = await req.json();
    logStep("Request received", { sessionId });

    if (!sessionId) {
      logStep("ERROR: No session ID provided");
      return new Response(JSON.stringify({ error: "Session ID requerido" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Create Supabase service client to bypass RLS
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    logStep("Supabase service client created");

    // Find order by Stripe session ID
    const { data: orderData, error: orderError } = await supabaseService
      .from("orders")
      .select("id, access_token, customer_email")
      .eq("stripe_session_id", sessionId)
      .single();

    if (orderError || !orderData) {
      logStep("ERROR: Order not found", { orderError });
      return new Response(JSON.stringify({ error: "Orden no encontrada" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    logStep("Order found", { orderId: orderData.id });

    return new Response(JSON.stringify({
      orderId: orderData.id,
      accessToken: orderData.access_token
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err: any) {
    logStep("ERROR in get-order-by-session", { message: err?.message, stack: err?.stack });
    return new Response(JSON.stringify({ error: err?.message || "Error interno del servidor" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});