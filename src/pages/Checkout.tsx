import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: any;
  description: any;
  price: number;
  state: string;
}

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
}

const Checkout = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [customerForm, setCustomerForm] = useState<CustomerForm>({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const productId = location.state?.productId;
  const sessionId = location.state?.sessionId;

  useEffect(() => {
    if (!productId) {
      navigate("/products");
      return;
    }
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, state")
        .eq("id", productId)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar el producto",
        variant: "destructive",
      });
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CustomerForm, value: string) => {
    setCustomerForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!customerForm.name.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor ingresa tu nombre completo",
        variant: "destructive",
      });
      return false;
    }
    
    if (!customerForm.email.trim() || !customerForm.email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !product) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert({
          customer_name: customerForm.name,
          customer_email: customerForm.email,
          customer_phone: customerForm.phone || null,
          product_ids: [product.id],
          total_amount: product.price,
          ghl_webhook_sent: false
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "¡Orden creada exitosamente!",
        description: "Recibirás un email con los detalles de tu compra",
      });

      // Redirect to a success page or payment processor
      navigate("/success", { 
        state: { 
          orderId: data.id,
          productName: typeof product.name === 'object' 
            ? product.name.es || product.name.en 
            : product.name
        } 
      });

    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "No se pudo procesar tu orden. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStateName = (state: string) => {
    const stateMap: Record<string, string> = {
      california: "California",
      texas: "Texas", 
      florida: "Florida",
      new_york: "Nueva York"
    };
    return stateMap[state] || state.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando información de compra...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <p className="text-muted-foreground">Producto no encontrado.</p>
            <Button onClick={() => navigate("/products")} className="mt-4">
              Ver Productos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const productName = typeof product.name === 'object' 
    ? product.name.es || product.name.en || "Producto"
    : product.name;
  
  const productDescription = typeof product.description === 'object'
    ? product.description.es || product.description.en || ""
    : product.description || "";

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Finalizar Compra</h1>
          <p className="text-muted-foreground">
            Completa tu información para recibir tu documento legal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de tu Orden</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{productName}</h3>
                  <Badge variant="secondary" className="mt-2">
                    {getStateName(product.state)}
                  </Badge>
                  {productDescription && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {productDescription}
                    </p>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal:</span>
                <span>{formatPrice(product.price)}</span>
              </div>
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(product.price)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information Form */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo *</Label>
                  <Input
                    id="name"
                    value={customerForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (Opcional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? "Procesando..." : `Pagar ${formatPrice(product.price)}`}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/products")}
                    disabled={submitting}
                  >
                    Volver a Productos
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Al completar esta compra, recibirás tu documento por email.
                  Todos los documentos están verificados por abogados licenciados.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;