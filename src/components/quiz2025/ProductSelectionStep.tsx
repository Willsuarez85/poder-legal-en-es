import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: any;
  description: any;
  price: number;
  recommendation_criteria: any;
}

interface ProductSelectionStepProps {
  selectedState: string;
  selectedProducts: string[];
  onProductsSelect: (products: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const getProductName = (name: any): string => {
  if (typeof name === 'string') return name;
  if (typeof name === 'object' && name !== null) {
    return name.es || name.en || 'Documento Legal';
  }
  return 'Documento Legal';
};

const getProductDescription = (description: any): string => {
  if (typeof description === 'string') return description;
  if (typeof description === 'object' && description !== null) {
    if (description.es) return description.es;
    if (description.en) return description.en;
  }
  return 'Documento legal válido para tu estado';
};

export const ProductSelectionStep = ({ selectedState, selectedProducts, onProductsSelect, onNext, onPrev }: ProductSelectionStepProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map URL state names to database state abbreviations
  const stateMapping: Record<string, string> = {
    california: 'ca',
    texas: 'tx',
    florida: 'fl',
    new_york: 'ny'
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        console.log('ProductSelectionStep - selectedState:', selectedState);
        
        // If selectedState is already a database abbreviation (ca, tx, fl), use it directly
        // If it's a full name (california, texas), map it
        let dbState = selectedState;
        if (stateMapping[selectedState]) {
          dbState = stateMapping[selectedState];
        }
        
        console.log('ProductSelectionStep - dbState:', dbState);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`state.eq.${dbState},state.eq.all`);
        
        console.log('ProductSelectionStep - query result:', { data, error, dbState });
        
        if (error) {
          console.error('ProductSelectionStep - Supabase error:', error);
          setError('Error al cargar productos');
          return;
        }
        
        if (data) {
          setProducts(data);
          console.log('ProductSelectionStep - products set:', data.length);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('ProductSelectionStep - fetch error:', error);
        setError('Error al conectar con la base de datos');
      } finally {
        setLoading(false);
      }
    };

    if (selectedState) {
      fetchProducts();
    } else {
      console.log('ProductSelectionStep - no selectedState');
      setError('No se ha seleccionado un estado');
      setLoading(false);
    }
  }, [selectedState]);

  const handleProductToggle = (productId: string) => {
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      onProductsSelect(selectedProducts.filter(id => id !== productId));
    } else {
      onProductsSelect([...selectedProducts, productId]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          No se encontraron productos para tu estado.
        </p>
        <Button variant="outline" onClick={onPrev}>
          ⬅️ Volver a seleccionar estado
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">
          ✅ Hemos encontrado {products.length} documentos legales para tu estado
        </h1>
        <p className="text-muted-foreground">
          Selecciona los documentos que necesitas
        </p>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => {
          const isSelected = selectedProducts.includes(product.id);
          const productName = getProductName(product.name);
          const productDescription = getProductDescription(product.description);
          
          return (
            <Card 
              key={product.id} 
              className={`transition-all cursor-pointer ${isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}`}
              onClick={() => handleProductToggle(product.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{productName}</CardTitle>
                      <p className="text-muted-foreground text-sm mt-1">
                        {productDescription}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                    <FileText className="h-8 w-8 text-red-600" />
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleProductToggle(product.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="scale-125"
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <div className="sticky bottom-0 bg-background border-t p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto gap-4">
          <Button variant="outline" onClick={onPrev}>
            ⬅️ Anterior
          </Button>
          
          <div className="flex-1 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {selectedProducts.length} producto(s) seleccionado(s)
            </p>
            {selectedProducts.length > 0 && (
              <p className="text-lg font-bold text-primary">
                Total: {formatPrice(
                  selectedProducts.reduce((total, productId) => {
                    const product = products.find(p => p.id === productId);
                    return total + (product ? product.price : 0);
                  }, 0)
                )}
              </p>
            )}
          </div>
          
          <Button
            onClick={onNext}
            disabled={selectedProducts.length === 0}
            className="px-8"
            style={{ backgroundColor: '#de1f27' }}
          >
            ➡️ Continuar con tu compra
          </Button>
        </div>
      </div>
    </div>
  );
};