import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { safeText, getProductName, getProductDescription } from "@/lib/safeText";

interface Product {
  id: string;
  name: any;
  description: any;
  price: number;
  state: string;
  recommendation_criteria: any;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { state: urlState } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem, items, totalAmount, setCustomerData } = useCart();

  // Get state from URL parameter or default to california
  const currentState = urlState || 'california';
  
  const stateDisplayNames: Record<string, string> = {
    california: "California",
    texas: "Texas",
    florida: "Florida", 
    new_york: "Nueva York"
  };

  const quizData = location.state?.quizData;

  useEffect(() => {
    fetchProducts();
    
    // If we have contact data from the quiz, save it to the cart context
    const contactData = location.state?.contactData;
    if (contactData) {
      setCustomerData({
        name: contactData.name,
        phone: contactData.phone,
        email: contactData.email || `${contactData.phone}@example.com` // Default email if not provided
      });
    }
  }, [currentState, location.state]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, state, recommendation_criteria")
        .or(`state.eq.${currentState},state.eq.ALL`);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error", 
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      const newSelected = { ...selectedProducts };
      delete newSelected[productId];
      setSelectedProducts(newSelected);
    } else {
      setSelectedProducts(prev => ({ ...prev, [productId]: quantity }));
    }
  };

  const handleProductToggle = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts(prev => ({ ...prev, [productId]: 1 }));
    } else {
      const newSelected = { ...selectedProducts };
      delete newSelected[productId];
      setSelectedProducts(newSelected);
    }
  };

  const handleCheckout = async () => {
    if (Object.keys(selectedProducts).length === 0) {
      toast({
        title: "Selecciona productos",
        description: "Debes seleccionar al menos un producto para continuar",
        variant: "destructive",
      });
      return;
    }

    // Add all selected products to cart
    for (const [productId, quantity] of Object.entries(selectedProducts)) {
      const product = products.find(p => p.id === productId);
      if (product) {
        for (let i = 0; i < quantity; i++) {
          addItem({
            productId: product.id,
            name: getProductName(product.name),
            price: product.price,
            quantity: 1,
            state: product.state
          });
        }
      }
    }

    // Call existing cart checkout
    try {
      const cartItems = Object.entries(selectedProducts).map(([productId, quantity]) => ({
        productId,
        quantity
      }));

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          items: cartItems,
          origin: window.location.origin,
          customerData: location.state?.contactData ? {
            name: location.state.contactData.name,
            phone: location.state.contactData.phone,
            email: location.state.contactData.email || `${location.state.contactData.phone}@example.com`
          } : null
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Error",
        description: "No se pudo procesar el pago. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStateName = (state: any) => {
    const stateMap: Record<string, string> = {
      california: "California",
      texas: "Texas", 
      florida: "Florida",
      new_york: "Nueva York"
    };
    if (typeof state === "string") return stateMap[state] || state.toUpperCase();
    return safeText(state) || "";
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Todos los documentos para proteger lo que más amas en {stateDisplayNames[currentState]}
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Protege tu familia, propiedades y futuro con nuestros documentos legales especializados.
          </p>
          <p className="text-primary font-semibold mb-6">
            ✓ Documentos válidos en {stateDisplayNames[currentState]} ✓ Llenado automático ✓ Entrega inmediata
          </p>
          
          {Object.keys(selectedProducts).length > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <p className="font-medium">
                {Object.values(selectedProducts).reduce((a, b) => a + b, 0)} productos seleccionados
              </p>
              <p className="text-2xl font-bold text-primary">
                Total: {formatPrice(
                  Object.entries(selectedProducts).reduce((total, [productId, quantity]) => {
                    const product = products.find(p => p.id === productId);
                    return total + (product ? product.price * quantity : 0);
                  }, 0)
                )}
              </p>
            </div>
          )}
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {products.map((product) => {
                const productName = getProductName(product.name);
                const productDescription = getProductDescription(product.description);
                const priceDisplay = Number.isFinite(product.price) ? formatPrice(product.price) : "";
                const isSelected = selectedProducts[product.id] > 0;
                const quantity = selectedProducts[product.id] || 0;

                return (
                  <Card key={product.id} className={`transition-all duration-200 ${isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleProductToggle(product.id, checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">{productName}</CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {stateDisplayNames[currentState]}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {productDescription && (
                        <p className="text-muted-foreground text-sm mb-4">
                          {productDescription}
                        </p>
                      )}
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-primary">
                            {priceDisplay}
                          </span>
                        </div>
                        
                        {isSelected && (
                          <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Cantidad:</label>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              value={quantity}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                              className="w-20"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {Object.keys(selectedProducts).length > 0 && (
              <div className="sticky bottom-0 bg-background border-t border-border p-6 shadow-lg">
                <div className="max-w-6xl mx-auto">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">
                        Total: {formatPrice(
                          Object.entries(selectedProducts).reduce((total, [productId, quantity]) => {
                            const product = products.find(p => p.id === productId);
                            return total + (product ? product.price * quantity : 0);
                          }, 0)
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Object.values(selectedProducts).reduce((a, b) => a + b, 0)} productos seleccionados
                      </p>
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      size="lg"
                      className="min-w-[200px]"
                    >
                      Proceder al Pago
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
          
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">
                No se encontraron productos
              </h3>
              <p className="text-muted-foreground mb-6">
                No hay productos disponibles para {stateDisplayNames[currentState]}.
              </p>
              <Button variant="outline" onClick={() => navigate("/products/california")}>
                Ver Productos de California
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">🛡️ Protección Legal Completa</h2>
            <p className="text-muted-foreground mb-4">
              Nuestros documentos están diseñados específicamente para las leyes de {stateDisplayNames[currentState]}.
            </p>
            <p className="text-sm font-medium text-primary mb-6">
              ✓ Válidos legalmente ✓ Fácil de completar ✓ Entrega inmediata por email
            </p>
            <Button variant="outline" onClick={() => navigate("/quiz")}>
              ¿Necesitas ayuda para elegir? Haz nuestro quiz
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate("/")}>
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;