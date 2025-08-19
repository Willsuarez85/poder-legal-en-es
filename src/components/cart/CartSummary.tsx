import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-US", { style: "currency", currency: "USD" }).format(price);

const CartSummary = () => {
  const { items, updateQuantity, removeItem, clear, totalAmount, customerData } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!items.length) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          origin: window.location.origin,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          customerData: customerData,
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No se pudo crear la sesión de pago");
      }
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err?.message || "No se pudo iniciar el pago con Stripe",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu Carrito</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <p className="text-muted-foreground">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Badge variant="secondary">{item.state?.replace("_", " ")?.toUpperCase() || "ESTADO"}</Badge>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                  >
                    −
                  </Button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button variant="ghost" onClick={() => removeItem(item.productId)}>
                    Quitar
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-primary">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex gap-3 pt-1">
              <Button variant="outline" onClick={clear} disabled={loading}>
                Vaciar carrito
              </Button>
              <Button onClick={handleCheckout} disabled={loading || items.length === 0} className="flex-1">
                {loading ? "Creando pago..." : "Pagar con Stripe"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CartSummary;
