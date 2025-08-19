import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { orderId, webhookUrl } = await req.json();
    
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    if (!webhookUrl) {
      throw new Error("Webhook URL is required");
    }

    logStep("Parameters received", { orderId, webhookUrl: webhookUrl.substring(0, 50) + "..." });

    // Create Supabase client with service role key
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get order details
    const { data: order, error: orderError } = await supabaseService
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      logStep("ERROR: Order not found", { orderId, orderError });
      throw new Error("Order not found");
    }

    logStep("Order found", { orderId, customerEmail: order.customer_email });

    // Check if webhook was already sent
    if (order.ghl_webhook_sent) {
      logStep("Webhook already sent for this order", { orderId });
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Webhook already sent for this order" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Prepare webhook payload
    const webhookPayload = {
      event: "payment_confirmed",
      order_id: order.id,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone,
      total_amount: order.total_amount,
      product_ids: order.product_ids,
      stripe_session_id: order.stripe_session_id,
      timestamp: new Date().toISOString(),
      created_at: order.created_at
    };

    logStep("Sending webhook", { webhookUrl: webhookUrl.substring(0, 50) + "...", payload: webhookPayload });

    // Send webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });

    logStep("Webhook response", { 
      status: webhookResponse.status, 
      statusText: webhookResponse.statusText 
    });

    // Update order to mark webhook as sent
    const { error: updateError } = await supabaseService
      .from("orders")
      .update({ ghl_webhook_sent: true })
      .eq("id", orderId);

    if (updateError) {
      logStep("ERROR: Failed to update webhook status", { updateError });
      throw new Error("Failed to update webhook status");
    }

    logStep("Webhook sent successfully", { orderId, status: webhookResponse.status });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Webhook sent successfully",
      webhook_status: webhookResponse.status
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in send-webhook", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});