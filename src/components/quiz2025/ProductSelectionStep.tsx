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

// Hardcoded product information based on requirements
const PRODUCT_INFO: Record<string, {
  title: string;
  benefit: string;
  summary: string;
  sirve: string[];
  noSirve: string[];
  fillTime: string;
}> = {
  'medical': {
    title: 'Poder Notarial Médico',
    benefit: 'Tu salud, tus reglas. Siempre.',
    summary: 'En caso de emergencia quién decide sobre tu salud',
    sirve: [
      'Autorizar tratamientos y cirugías en emergencias',
      'Acceder/compartir tu información médica (HIPAA release)',
      'Asegurar que se respeten tus valores personales/religiosos'
    ],
    noSirve: [
      'Manejar dinero o vender bienes',
      'Reemplazar testamento',
      'Firmar contratos no médicos'
    ],
    fillTime: '5–10 min'
  },
  'financial': {
    title: 'Poder Notarial Financiero',
    benefit: 'Mantén cuentas y pagos al día si tu no estas',
    summary: 'Acceso a bancos, pagos y trámites sin bloqueos',
    sirve: [
      'Manejar cuentas bancarias y pagos (servicios, deudas)',
      'Comprar, vender o alquilar bienes si lo autorizas',
      'Presentar impuestos y firmar trámites financieros'
    ],
    noSirve: [
      'Quitar tu control si estás en capacidad de decidir',
      'Custodia de tus hijos',
      'Decisiones médicas'
    ],
    fillTime: '8–10 min'
  },
  'childcare': {
    title: 'Poder Notarial Custodia de Niños (temporal)',
    benefit: 'Autoridad legal para que un adulto cuide a tus hijos',
    summary: 'Escuela, salud y viajes autorizados sin problemas',
    sirve: [
      'Inscribir en escuela y firmar permisos',
      'Autorizar atención médica de emergencia',
      'Viajar con los menores con permiso formal fuera del país'
    ],
    noSirve: [
      'Cambiar la custodia permanente',
      'Permitir adopciones',
      'Quitar tus derechos de padre/madre'
    ],
    fillTime: '7–12 min'
  },
  'specific': {
    title: 'Poder Notarial Específico (limitado)',
    benefit: 'Delegas un trámite puntual sin estar presente',
    summary: 'Alguien firma/gestiona ese trámite por ti',
    sirve: [
      'Vender tu casa: autorizar firma en el cierre, trámites de título y documentos específicos',
      'Recibir pagos o firmar documentos concretos (indicar cuáles)',
      'Gestionar un trámite en fechas definidas'
    ],
    noSirve: [
      'Uso general sin límites ni fechas',
      'Decisiones médicas o custodia de menores',
      'Manejo total de tus finanzas (usa la financiera)'
    ],
    fillTime: '8–12 min'
  }
};

const getProductType = (product: Product): string => {
  const name = typeof product.name === 'object' ? product.name.es : product.name;
  const nameLower = name?.toLowerCase() || '';
  
  if (nameLower.includes('médic') || nameLower.includes('medical') || nameLower.includes('health')) {
    return 'medical';
  }
  if (nameLower.includes('financ') || nameLower.includes('financial')) {
    return 'financial';
  }
  if (nameLower.includes('niño') || nameLower.includes('child') || nameLower.includes('custodia')) {
    return 'childcare';
  }
  if (nameLower.includes('específic') || nameLower.includes('specific') || nameLower.includes('limitado')) {
    return 'specific';
  }
  return 'medical'; // default
};

export const ProductSelectionStep = ({ selectedState, selectedProducts, onProductsSelect, onNext, onPrev }: ProductSelectionStepProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  // Map all US states to their abbreviations (limited to 3 for now)
  const stateMapping: Record<string, string> = {
    'california': 'ca',
    'florida': 'fl',
    'texas': 'tx'
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
      <div className="min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center">
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
      <div className="min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center p-4">
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
      <div className="min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center p-4">
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
    <div className="min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-between p-4 max-w-md mx-auto w-full">
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
            const productType = getProductType(product);
            const productInfo = PRODUCT_INFO[productType];
            
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
                            {productInfo.title}
                          </h3>
                          <p className="text-sm font-semibold text-blue-600 mb-1">
                            {productInfo.benefit}
                          </p>
                          <p className="text-xs text-gray-600 italic">
                            {productInfo.summary}
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
                        Ver detalles
                      </>
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-3 animate-slideDown">
                      <div>
                        <p className="text-sm font-bold text-gray-700 mb-2">✅ Sirve para:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {productInfo.sirve.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <p className="text-sm font-bold text-gray-700 mb-2">❌ No sirve para:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {productInfo.noSirve.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm font-bold text-gray-700 mb-2">📦 Incluye:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>🧭 Instrucciones <strong>paso a paso</strong> para firmar y <strong>notarizar</strong> (en español)</li>
                          <li>🇪🇸/🇺🇸 Plantilla en <strong>español e inglés</strong></li>
                          <li>✅ <strong>100% legal — verificada en tu estado</strong></li>
                          <li>⏱️ <strong>Tiempo estimado de llenado:</strong> {productInfo.fillTime}</li>
                        </ul>
                      </div>

                      <div className="flex items-center gap-3 pt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          PDF
                        </span>
                        {isSelected && (
                          <span className="text-green-600 font-semibold">
                            ☑️ En el carrito
                          </span>
                        )}
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

      {/* Tip Box - Moved to bottom before buttons */}
      <div className="mb-6 animate-fadeIn">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-400 rounded-full p-2 shadow-md flex-shrink-0">
              <Info className="w-5 h-5 text-gray-800" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Consejo:</strong> Cada Poder Notarial tiene usos específicos. Selecciona solo los que necesitas según tu situación.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="space-y-4">
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