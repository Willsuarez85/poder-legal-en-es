import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const { origin, items, customerData, quizData } = await req.json();
    logStep("Request received", { origin, itemsCount: items?.length, customerData, quizData });

    if (!Array.isArray(items) || items.length === 0) {
      logStep("ERROR: No items in cart");
      return new Response(JSON.stringify({ error: "No hay items en el carrito" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    
    if (!supabaseUrl || !supabaseAnonKey) {
      logStep("ERROR: Missing Supabase credentials");
      throw new Error("Missing Supabase credentials");
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey, { 
      auth: { persistSession: false } 
    });
    logStep("Supabase client created");

    const productIds = items.map((i: any) => i.productId);
    logStep("Fetching products", { productIds });
    
    const { data: products, error } = await supabase
      .from("products")
      .select("id, name, price")
      .in("id", productIds);

    if (error) {
      logStep("ERROR: Database query failed", { error });
      throw error;
    }
    
    logStep("Products fetched", { productsCount: products?.length });

    const line_items = items.map((i: any) => {
      const product = products?.find((p: any) => p.id === i.productId);
      const nameObj = product?.name || {};
      const productName = typeof nameObj === "object" 
        ? nameObj.es || nameObj.en || "Documento Legal" 
        : String(nameObj);
      const price = Number(product?.price) || 0;
      
      return {
        price_data: {
          currency: "usd",
          product_data: { name: productName },
          unit_amount: Math.max(0, Math.round(price * 100)),
        },
        quantity: Math.max(1, Number(i.quantity) || 1),
      };
    });
    
    logStep("Line items prepared", { lineItemsCount: line_items.length });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    if (!stripeKey) {
      logStep("ERROR: Missing Stripe secret key");
      throw new Error("Falta STRIPE_SECRET_KEY en Secrets");
    }
    
    logStep("Stripe key found", { keyPrefix: stripeKey.substring(0, 8) });

    const stripe = new Stripe(stripeKey, { 
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient()
    });
    logStep("Stripe client created");

    const baseUrl = typeof origin === "string" && origin.startsWith("http")
      ? origin
      : (req.headers.get("origin") || "https://mszfhlkkszsojlzxgvou.supabase.co");
    
    logStep("Creating Stripe session", { baseUrl });

    // Create order in database before creating Stripe session
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Calculate total amount
    const totalAmount = line_items.reduce((sum, item) => {
      return sum + (item.price_data.unit_amount * item.quantity);
    }, 0) / 100; // Convert from cents to dollars

    // Create order record
    const { data: orderData, error: orderError } = await supabaseService
      .from("orders")
      .insert({
        customer_name: customerData?.name || "Cliente de prueba",
        customer_email: customerData?.email || `guest-${Date.now()}@poder-legal.com`,
        customer_phone: customerData?.phone || null,
        product_ids: productIds,
        total_amount: totalAmount,
        stripe_session_id: null, // Will be updated after session creation
      })
      .select('id')
      .single();

    if (orderError) {
      logStep("ERROR: Failed to create order", { orderError });
      throw new Error("Failed to create order");
    }

    const orderId = orderData.id;
    logStep("Order created", { orderId });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${baseUrl}/results`,
      customer_email: customerData?.email || undefined,
      metadata: {
        order_id: orderId,
        estado: quizData?.state || "",
        arreglo_productos: JSON.stringify(productIds),
        nombre: customerData?.name || "",
        email: customerData?.email || "",
        telefono: customerData?.phone || "",
      },
    });

    logStep("Stripe session metadata", { 
      metadata: {
        order_id: orderId,
        estado: quizData?.state || "",
        arreglo_productos: JSON.stringify(productIds),
        nombre: customerData?.name || "",
        email: customerData?.email || "",
        telefono: customerData?.phone || "",
      }
    });

    // Update order with Stripe session ID
    await supabaseService
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq('id', orderId);

    logStep("Stripe session created", { sessionId: session.id, url: session.url, orderId });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    logStep("ERROR in create-payment", { message: err?.message, stack: err?.stack });
    return new Response(JSON.stringify({ error: err?.message || "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
