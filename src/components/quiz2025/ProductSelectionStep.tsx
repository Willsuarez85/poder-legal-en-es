import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ShoppingCart, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Info } from "lucide-react";
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
      return name.es || name.en || 'Poder Notarial';
    }
    return 'Poder Notarial';
  } catch (error) {
    console.error('Error getting product name:', error);
    return 'Poder Notarial';
  }
};

const getProductDescription = (description: any): string => {
  try {
    if (typeof description === 'string') return description;
    if (typeof description === 'object' && description !== null) {
      if (description.es && typeof description.es === 'object') {
        return description.es.purpose || description.es.not_for || 'Documento legal válido para tu estado';
      }
      if (description.en && typeof description.en === 'object') {
        return description.en.purpose || description.en.not_for || 'Documento legal válido para tu estado';
      }
      if (description.purpose) return description.purpose;
      if (description.not_for) return description.not_for;
      if (description.es) return description.es;
      if (description.en) return description.en;
    }
    return 'Documento legal válido para tu estado';
  } catch (error) {
    console.error('Error getting product description:', error);
    return 'Documento legal válido para tu estado';
  }
};

const getProductDetails = (description: any): { purpose: string; notFor: string } => {
  try {
    if (typeof description === 'object' && description !== null) {
      if (description.es && typeof description.es === 'object') {
        return {
          purpose: description.es.purpose || 'Autoriza a alguien a actuar en tu nombre',
          notFor: description.es.not_for || 'No válido para ciertas transacciones especializadas'
        };
      }
    }
    return {
      purpose: 'Autoriza a alguien a actuar en tu nombre en diversas situaciones legales',
      notFor: 'No válido para ciertas transacciones especializadas'
    };
  } catch (error) {
    return {
      purpose: 'Autoriza a alguien a actuar en tu nombre',
      notFor: 'No válido para ciertas transacciones especializadas'
    };
  }
};

export const ProductSelectionStep = ({ selectedState, selectedProducts, onProductsSelect, onNext, onPrev }: ProductSelectionStepProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  // Map all US states to their abbreviations
  const stateMapping: Record<string, string> = {
    'alabama': 'al',
    'alaska': 'ak',
    'arizona': 'az',
    'arkansas': 'ar',
    'california': 'ca',
    'colorado': 'co',
    'connecticut': 'ct',
    'delaware': 'de',
    'florida': 'fl',
    'georgia': 'ga',
    'hawaii': 'hi',
    'idaho': 'id',
    'illinois': 'il',
    'indiana': 'in',
    'iowa': 'ia',
    'kansas': 'ks',
    'kentucky': 'ky',
    'louisiana': 'la',
    'maine': 'me',
    'maryland': 'md',
    'massachusetts': 'ma',
    'michigan': 'mi',
    'minnesota': 'mn',
    'mississippi': 'ms',
    'missouri': 'mo',
    'montana': 'mt',
    'nebraska': 'ne',
    'nevada': 'nv',
    'new-hampshire': 'nh',
    'new-jersey': 'nj',
    'new-mexico': 'nm',
    'new-york': 'ny',
    'north-carolina': 'nc',
    'north-dakota': 'nd',
    'ohio': 'oh',
    'oklahoma': 'ok',
    'oregon': 'or',
    'pennsylvania': 'pa',
    'rhode-island': 'ri',
    'south-carolina': 'sc',
    'south-dakota': 'sd',
    'tennessee': 'tn',
    'texas': 'tx',
    'utah': 'ut',
    'vermont': 'vt',
    'virginia': 'va',
    'washington': 'wa',
    'west-virginia': 'wv',
    'wisconsin': 'wi',
    'wyoming': 'wy'
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
        let dbState = selectedState.toLowerCase().replace('_', '-');
        dbState = stateMapping[dbState] || 'ca'; // Default to CA if not found
        
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

  const toggleExpanded = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
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

  const handleNext = () => {
    if (selectedProducts.length > 0) {
      onNext();
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando documentos disponibles...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <p className="text-lg font-semibold mb-2">⚠️ Hubo un problema</p>
            <p>{error}</p>
          </div>
          <div className="space-x-4">
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="rounded-xl"
            >
              Reintentar
            </Button>
            <Button onClick={onPrev} variant="outline" className="rounded-xl">
              <ChevronLeft className="mr-2 w-4 h-4" />
              Volver
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-6">
            <p className="text-lg font-semibold mb-2">📄 No hay documentos disponibles</p>
            <p className="text-gray-600">
              Estamos trabajando en documentos para tu estado.
            </p>
          </div>
          <Button onClick={onPrev} variant="outline" className="rounded-xl">
            <ChevronLeft className="mr-2 w-4 h-4" />
            Seleccionar otro estado
          </Button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-[80vh] flex flex-col justify-between p-4 max-w-md mx-auto w-full">
      {/* Tip Box */}
      <div className="mb-6 animate-fadeIn">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-green-400 rounded-full p-3 shadow-md">
              <Info className="w-6 h-6 text-gray-800" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Consejo útil</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Cada tipo de Poder Notarial (Power of Attorney) tiene usos específicos. 
                Selecciona solo los que necesitas según tu situación particular.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="text-center mb-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Selecciona tus documentos
          </h2>
          <p className="text-gray-600 text-sm">
            {products.length} Poder{products.length > 1 ? 'es' : ''} Notarial{products.length > 1 ? 'es' : ''} disponible{products.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto">
          {products.map((product) => {
            const isSelected = selectedProducts.includes(product.id);
            const isExpanded = expandedProducts.has(product.id);
            const productName = getProductName(product.name);
            const details = getProductDetails(product.description);
            
            return (
              <Card 
                key={product.id}
                className={`border-2 rounded-2xl transition-all ${
                  isSelected 
                    ? 'border-green-500 bg-green-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="p-5">
                  {/* Product Header */}
                  <div 
                    className="flex items-start gap-4 cursor-pointer"
                    onClick={() => handleProductToggle(product.id)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 mr-4">
                          <h3 className="font-bold text-gray-900 mb-1">
                            {productName.replace('Carta de Poder', 'Poder Notarial')}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {details.purpose}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xl font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(product.id);
                    }}
                    className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Ver menos detalles
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Ver más detalles
                      </>
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 animate-slideDown">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">✅ Para qué sirve:</p>
                        <p className="text-xs text-gray-600">{details.purpose}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">❌ No válido para:</p>
                        <p className="text-xs text-gray-600">{details.notFor}</p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">Documento legal certificado</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Total Summary */}
        {selectedProducts.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                {selectedProducts.length} documento{selectedProducts.length > 1 ? 's' : ''} seleccionado{selectedProducts.length > 1 ? 's' : ''}
              </span>
              <span className="text-xl font-bold text-gray-900">
                Total: {formatPrice(calculateTotal())}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 space-y-4">
        <div className="flex gap-3">
          <Button
            onClick={onPrev}
            variant="outline"
            className="flex-1 h-14 font-semibold text-base rounded-2xl border-2"
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            <span>Anterior</span>
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedProducts.length === 0}
            className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
          >
            <span>Continuar</span>
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        
        <p className="text-center text-xs text-gray-500">
          Paso 3 de 4 • Selección de Documentos
        </p>
      </div>
    </div>
  );
};