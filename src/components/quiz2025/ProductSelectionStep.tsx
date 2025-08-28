import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: any;
  description: any;
  price: number;
  state: string;
  label?: string;
  recommendation_criteria?: any;
}

interface ProductSelectionStepProps {
  selectedState: string;
  selectedProducts: string[];
  onProductsSelect: (products: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const getProductName = (name: any): string => {
  try {
    if (typeof name === 'string') return name;
    if (typeof name === 'object' && name !== null) {
      return name.es || name.en || 'Documento Legal';
    }
    return 'Documento Legal';
  } catch (error) {
    console.error('Error getting product name:', error);
    return 'Documento Legal';
  }
};

const getProductDescription = (description: any): string => {
  try {
    if (typeof description === 'string') return description;
    if (typeof description === 'object' && description !== null) {
      // Handle the nested structure: {es: {not_for, purpose}, en: {not_for, purpose}}
      if (description.es && typeof description.es === 'object') {
        return description.es.purpose || description.es.not_for || 'Documento legal válido para tu estado';
      }
      if (description.en && typeof description.en === 'object') {
        return description.en.purpose || description.en.not_for || 'Documento legal válido para tu estado';
      }
      // Handle direct structure: {not_for, purpose}
      if (description.purpose) return description.purpose;
      if (description.not_for) return description.not_for;
      // Fallback for other object structures
      if (description.es) return description.es;
      if (description.en) return description.en;
    }
    return 'Documento legal válido para tu estado';
  } catch (error) {
    console.error('Error getting product description:', error);
    return 'Documento legal válido para tu estado';
  }
};

export const ProductSelectionStep = ({ selectedState, selectedProducts, onProductsSelect, onNext, onPrev }: ProductSelectionStepProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map URL state names to database state abbreviations
  const stateMapping: Record<string, string> = {
    'california': 'ca',
    'texas': 'tx', 
    'florida': 'fl',
    'new_york': 'ny'
  };

  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      try {
        setError(null);
        setLoading(true);
        
        if (!selectedState) {
          throw new Error('No state selected');
        }

        // Map state name to database abbreviation
        let dbState = selectedState.toLowerCase();
        if (stateMapping[dbState]) {
          dbState = stateMapping[dbState];
        }
        
        console.log('Selected state:', selectedState, '-> DB state:', dbState);
        
        const { data, error } = await supabase
          .from('products')
          .select('id, name, description, price, state, label, recommendation_criteria')
          .eq('state', dbState);
        
        if (error) {
          throw error;
        }
        
        if (isMounted) {
          setProducts(data || []);
          console.log('Products loaded:', data?.length || 0);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        if (isMounted) {
          setError('Error al cargar productos. Por favor intenta de nuevo.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [selectedState]);

  const handleProductToggle = (productId: string) => {
    try {
      const isSelected = selectedProducts.includes(productId);
      if (isSelected) {
        onProductsSelect(selectedProducts.filter(id => id !== productId));
      } else {
        onProductsSelect([...selectedProducts, productId]);
      }
    } catch (error) {
      console.error('Error toggling product:', error);
    }
  };

  const formatPrice = (price: number) => {
    try {
      return new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price);
    } catch (error) {
      console.error('Error formatting price:', error);
      return `$${price}`;
    }
  };

  const calculateTotal = () => {
    try {
      return selectedProducts.reduce((total, productId) => {
        const product = products.find(p => p.id === productId);
        return total + (product ? product.price : 0);
      }, 0);
    } catch (error) {
      console.error('Error calculating total:', error);
      return 0;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Cargando productos disponibles...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <p className="text-lg font-semibold mb-2">⚠️ Hubo un problema</p>
          <p>{error}</p>
        </div>
        <div className="space-x-4">
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Reintentar
          </Button>
          <Button onClick={onPrev} variant="outline">
            ⬅️ Volver
          </Button>
        </div>
      </div>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">📄 No hay productos disponibles</p>
          <p className="text-muted-foreground">
            No se encontraron documentos para el estado seleccionado.
          </p>
        </div>
        <Button onClick={onPrev} variant="outline">
          ⬅️ Seleccionar otro estado
        </Button>
      </div>
    );
  }

  // Main render
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          ✅ Documentos disponibles para tu estado
        </h1>
        <p className="text-muted-foreground">
          Encontramos {products.length} documento(s) legal(es). Selecciona los que necesitas.
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
              className={`transition-all cursor-pointer ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
              }`}
              onClick={() => handleProductToggle(product.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight mb-2">
                        {productName}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {productDescription}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 flex-shrink-0">
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

      {/* Summary and navigation */}
      <div className="sticky bottom-0 bg-background border-t p-6">
        <div className="flex justify-between items-center max-w-4xl mx-auto gap-4">
          <Button variant="outline" onClick={onPrev}>
            ⬅️ Anterior
          </Button>
          
          <div className="flex-1 text-center space-y-1">
            <p className="text-sm text-muted-foreground">
              {selectedProducts.length} producto(s) seleccionado(s)
            </p>
            {selectedProducts.length > 0 && (
              <p className="text-lg font-bold text-primary">
                Total: {formatPrice(calculateTotal())}
              </p>
            )}
          </div>
          
          <Button
            onClick={onNext}
            disabled={selectedProducts.length === 0}
            className="px-8"
            style={{ backgroundColor: '#de1f27' }}
          >
            ➡️ Continuar ({selectedProducts.length})
          </Button>
        </div>
      </div>
    </div>
  );
};