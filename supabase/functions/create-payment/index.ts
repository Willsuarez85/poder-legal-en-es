// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { origin, items } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No hay items en el carrito" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });

    const productIds = items.map((i: any) => i.productId);
    const { data: products, error } = await supabase
      .from("products")
      .select("id, name, price")
      .in("id", productIds);

    if (error) throw error;

    const line_items = items.map((i: any) => {
      const product = products?.find((p: any) => p.id === i.productId);
      const nameObj = product?.name || {};
      const productName =
        typeof nameObj === "object" ? nameObj.es || nameObj.en || "Documento Legal" : String(nameObj);
      const price = Number(product?.price) || 0;
      return {
        price_data: {
          currency: "usd",
          product_data: { name: productName },
          unit_amount: Math.max(0, Math.round(price * 100)),
        },
        quantity: Math.max(1, Number(i.quantity) || 1),
      } as Stripe.Checkout.SessionCreateParams.LineItem;
    });

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    if (!stripeKey) throw new Error("Falta STRIPE_SECRET_KEY en Secrets");

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    const baseUrl = typeof origin === "string" && origin.startsWith("http")
      ? origin
      : (req.headers.get("origin") || "https://mszfhlkkszsojlzxgvou.supabase.co");

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/results`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
