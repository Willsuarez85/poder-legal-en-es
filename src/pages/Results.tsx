import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CartSummary from "@/components/cart/CartSummary";
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

const Results = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  const sessionId = location.state?.sessionId;

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }
    fetchProductsAndRecommendations();
  }, [sessionId]);

  const fetchProductsAndRecommendations = async () => {
    try {
      // Fetch all active products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("id, name, description, price, state, recommendation_criteria");

      if (productsError) throw productsError;

      // Fetch user responses for this session
      const { data: responsesData, error: responsesError } = await supabase
        .from("quiz_responses")
        .select("*")
        .eq("session_id", sessionId);

      if (responsesError) throw responsesError;

      setProducts(productsData || []);
      
      // Use improved recommendation logic
      const recommended = getRecommendedProducts(productsData || [], responsesData || []);
      
      setRecommendedProducts(recommended);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las recomendaciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const findUserState = (responses: any[]) => {
    // Look for state-related responses (state codes like "CA", "TX", etc.)
    const stateResponse = responses.find(response => 
      typeof response.answer === 'string' && response.answer.length === 2
    );
    
    if (stateResponse) {
      const stateCode = stateResponse.answer.toUpperCase();
      // Map common state codes to database abbreviations
      const stateMap: Record<string, string> = {
        'CA': 'ca',
        'TX': 'tx', 
        'FL': 'fl',
        'NY': 'ny',
        'CT': 'ct',
        'NV': 'nv',
        'AZ': 'az'
      };
      return stateMap[stateCode] || 'ca';
    }
    
    return 'ca'; // Default state
  };

const getRecommendedProducts = (products: Product[], responses: any[]) => {
  const userState = findUserState(responses);

  const isPoaProduct = (product: Product) => {
    const nameValue = safeText(product.name);
    const normalized = nameValue.toLowerCase();
    return (
      normalized.includes('poa') ||
      normalized.includes('poder notarial') ||
      normalized.includes('poder de representación') ||
      normalized.includes('power of attorney')
    );
  };
  
  const stateMatchedProducts = products.filter(product => 
    product.state === userState || product.state === 'all'
  );

  const poaProducts = stateMatchedProducts.filter(isPoaProduct);
  const others = stateMatchedProducts.filter(p => !isPoaProduct(p));
  const combined = [...poaProducts, ...others];

  return combined.slice(0, 4);
};

const handlePurchase = (productId: string) => {
  navigate("/checkout", { state: { productId, sessionId } });
};

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Generando recomendaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Tus Recomendaciones</h1>
          <p className="text-muted-foreground text-lg">
            Basado en tus respuestas, estos son los documentos legales que recomendamos para ti.
          </p>
        </div>

        {recommendedProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product) => {
              // Debug logging to identify the problematic data
              console.log('Product data:', product);
              console.log('Product name:', product.name);
              console.log('Product description:', product.description);
              console.log('Product recommendation_criteria:', product.recommendation_criteria);
              
              const productName = getProductName(product.name);
              const productDescription = getProductDescription(product.description);
              
              console.log('Processed name:', productName);
              console.log('Processed description:', productDescription);

              return (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{productName}</CardTitle>
                      <Badge variant="secondary" className="ml-2">
                        {product.state.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    {productDescription && (
                      <p className="text-muted-foreground mb-4 flex-1">
                        {productDescription}
                      </p>
                    )}
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      
<Button 
  className="w-full" 
  onClick={() => {
    try {
      // Ensure all values are properly converted to strings
      const safeProductName = safeText(productName);
      console.log('Adding to cart with name:', safeProductName);
      
      addItem({
        productId: product.id,
        name: safeProductName,
        price: Number(product.price) || 0,
        quantity: 1,
        state: product.state
      });
      
      toast({ 
        title: "Añadido al carrito", 
        description: `${safeProductName} agregado (1 unidad).` 
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({ 
        title: "Error", 
        description: "No se pudo agregar al carrito",
        variant: "destructive"
      });
    }
  }}
>
  Agregar al carrito
</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold mb-4">
                No se encontraron recomendaciones específicas
              </h3>
              <p className="text-muted-foreground mb-6">
                Puedes explorar todos nuestros productos disponibles o repetir el cuestionario.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate("/quiz")}>
                  Repetir Cuestionario
                </Button>
                <Button onClick={() => navigate("/products")}>
                  Ver Todos los Productos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <Button variant="outline" onClick={() => navigate("/")}>
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;