import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
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

const PRODUCT_DETAILS = {
  medical: {
    fullDescription: {
      es: {
        serves: [
          "Autorizar tratamientos y cirugías en emergencias",
          "Acceder/compartir tu información médica (HIPAA release)",
          "Asegurar que se respeten tus valores personales/religiosos"
        ],
        notServes: [
          "Manejar dinero o vender bienes",
          "Reemplazar testamento",
          "Firmar contratos no médicos"
        ],
        includes: [
          "🧭 Instrucciones paso a paso para firmar y notarizar (en español)",
          "🇪🇸/🇺🇸 Plantilla en español e inglés para que entiendas lo que firmas",
          "✅ 100% legal — verificada en tu estado",
          "⏱️ Tiempo estimado de llenado: 5–10 min"
        ]
      }
    }
  },
  financial: {
    fullDescription: {
      es: {
        serves: [
          "Manejar cuentas bancarias y pagos (servicios, deudas)",
          "Comprar, vender o alquilar bienes si lo autorizas",
          "Presentar impuestos y firmar trámites financieros"
        ],
        notServes: [
          "Quitar tu control si estás en capacidad de decidir",
          "Custodia de tus hijos",
          "Decisiones médicas"
        ],
        includes: [
          "🧭 Instrucciones paso a paso para firmar y notarizar (en español)",
          "🇪🇸/🇺🇸 Plantilla en español e inglés",
          "✅ 100% legal — verificada en tu estado",
          "⏱️ Tiempo estimado de llenado: 8–10 min"
        ]
      }
    }
  },
  child_custody: {
    fullDescription: {
      es: {
        serves: [
          "Inscribir en escuela y firmar permisos",
          "Autorizar atención médica de emergencia",
          "Viajar con los menores con permiso formal fuera del país"
        ],
        notServes: [
          "Cambiar la custodia permanente",
          "Permitir adopciones",
          "Quitar tus derechos de padre/madre"
        ],
        includes: [
          "🧭 Instrucciones paso a paso para firmar y notarizar (en español)",
          "🇪🇸/🇺🇸 Plantilla en español e inglés",
          "✅ 100% legal — verificada en tu estado",
          "⏱️ Tiempo estimado de llenado: 7–12 min"
        ]
      }
    }
  },
  specific: {
    fullDescription: {
      es: {
        serves: [
          "Vender tu casa: autorizar firma en el cierre, trámites de título y documentos específicos",
          "Recibir pagos o firmar documentos concretos (indicar cuáles)",
          "Gestionar un trámite en fechas definidas"
        ],
        notServes: [
          "Uso general sin límites ni fechas",
          "Decisiones médicas o custodia de menores",
          "Manejo total de tus finanzas (usa la financiera)"
        ],
        includes: [
          "🧭 Instrucciones paso a paso para firmar y notarizar (en español)",
          "🇪🇸/🇺🇸 Plantilla en español e inglés",
          "✅ 100% legal — verificada en tu estado",
          "⏱️ Tiempo estimado de llenado: 8–12 min"
        ]
      }
    }
  }
};

export const ProductSelectionStep = ({ selectedState, selectedProducts, onProductsSelect, onNext, onPrev }: ProductSelectionStepProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('state', selectedState);
      
      if (data) {
        setProducts(data);
      }
      setLoading(false);
    };

    if (selectedState) {
      fetchProducts();
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

  const toggleExpanded = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  const getProductType = (criteria: any): string => {
    if (!criteria || typeof criteria !== 'object') return 'general';
    return criteria.type || 'general';
  };

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          ✅ Hemos encontrado 4 formatos de Cartas de poder 100% legales, verificadas por estado
        </h2>
        <p className="text-muted-foreground">
          Descarga inmediata con guía en español paso a paso
        </p>
        <p className="text-lg">
          Hemos encontrado 4 cartas de poder legal válidas en tu estado que podrían ayudarte a proteger lo que más amas. 
          Lee atentamente y selecciona el o los formatos que necesites.
        </p>
      </div>

      <div className="grid gap-6">
        {products.map((product) => {
          const productType = getProductType(product.recommendation_criteria);
          const details = PRODUCT_DETAILS[productType as keyof typeof PRODUCT_DETAILS];
          const isExpanded = expandedProducts.has(product.id);
          const isSelected = selectedProducts.includes(product.id);
          
          return (
            <Card key={product.id} className={`transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      {typeof product.name === 'object' ? product.name.es : product.name}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                      {typeof product.description === 'object' ? product.description.es : product.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${product.price}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span>📄 PDF</span>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleProductToggle(product.id)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(product.id)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-0">
                      <span>Ver detalles</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-4 mt-4">
                    {details && (
                      <>
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Sirve para:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {details.fullDescription.es.serves.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">No sirve para:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {details.fullDescription.es.notServes.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Incluye:</h4>
                          <ul className="space-y-1 text-sm">
                            {details.fullDescription.es.includes.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="sticky bottom-0 bg-background border-t p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button variant="outline" onClick={onPrev}>
            ⬅️ Anterior
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {selectedProducts.length} producto(s) seleccionado(s)
            </p>
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