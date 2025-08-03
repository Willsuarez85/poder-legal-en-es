import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedState, setSelectedState] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const states = [
    { value: "all", label: "Todos los Estados" },
    { value: "california", label: "California" },
    { value: "texas", label: "Texas" },
    { value: "florida", label: "Florida" },
    { value: "new_york", label: "Nueva York" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedState]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, state, recommendation_criteria");

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

  const filterProducts = () => {
    if (selectedState === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.state === selectedState));
    }
  };

  const handlePurchase = (productId: string) => {
    navigate("/checkout", { state: { productId } });
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
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Documentos Legales Disponibles</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Explora nuestra colección completa de documentos legales por estado.
          </p>
          
          <div className="flex justify-center">
            <div className="w-64">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const productName = typeof product.name === 'object' 
                ? product.name.es || product.name.en || "Producto"
                : product.name;
              
              const productDescription = typeof product.description === 'object' && product.description !== null
                ? (product.description.es || product.description.en || "")
                : (product.description && typeof product.description === 'string' ? product.description : "");

              return (
                <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl flex-1">{productName}</CardTitle>
                      <Badge variant="secondary" className="ml-2">
                        {getStateName(product.state)}
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
                        onClick={() => handlePurchase(product.id)}
                      >
                        Obtener Documento
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
                No se encontraron productos
              </h3>
              <p className="text-muted-foreground mb-6">
                No hay productos disponibles para el estado seleccionado.
              </p>
              <Button variant="outline" onClick={() => setSelectedState("all")}>
                Ver Todos los Productos
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">¿No estás seguro qué documento necesitas?</h2>
            <p className="text-muted-foreground mb-6">
              Nuestro cuestionario inteligente te ayudará a encontrar exactamente lo que necesitas.
            </p>
            <Button onClick={() => navigate("/quiz")}>
              Hacer Cuestionario
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