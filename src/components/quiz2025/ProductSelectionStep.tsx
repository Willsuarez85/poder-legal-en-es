import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

  // Map URL state names to database state abbreviations
  const stateMapping: Record<string, string> = {
    california: 'ca',
    texas: 'tx',
    florida: 'fl',
    new_york: 'ny'
  };

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('ProductSelectionStep - selectedState:', selectedState);
      
      // If selectedState is already a database abbreviation (ca, tx, fl), use it directly
      // If it's a full name (california, texas), map it
      let dbState = selectedState;
      if (stateMapping[selectedState]) {
        dbState = stateMapping[selectedState];
      }
      
      console.log('ProductSelectionStep - dbState:', dbState);
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`state.eq.${dbState},state.eq.all`);
        
        console.log('ProductSelectionStep - query result:', { data, error, dbState });
        
        if (error) {
          console.error('ProductSelectionStep - Supabase error:', error);
        }
        
        if (data) {
          setProducts(data);
          console.log('ProductSelectionStep - products set:', data.length);
        }
      } catch (error) {
        console.error('ProductSelectionStep - fetch error:', error);
      }
      
      setLoading(false);
    };

    if (selectedState) {
      fetchProducts();
    } else {
      console.log('ProductSelectionStep - no selectedState');
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

  const getProductType = (criteria: any): string => {
    if (!criteria || typeof criteria !== 'object') return 'general';
    return criteria.type || 'general';
  };

  if (loading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">
          ✅ Hemos encontrado 4 formatos de Cartas de poder 100% legales, verificadas en tu estado
        </h1>
      </div>

      <Accordion type="multiple" className="space-y-4">
        {products.map((product, index) => {
          const productType = getProductType(product.recommendation_criteria);
          const details = PRODUCT_DETAILS[productType as keyof typeof PRODUCT_DETAILS];
          const isSelected = selectedProducts.includes(product.id);
          
          return (
            <AccordionItem 
              key={product.id} 
              value={product.id}
              className={`border rounded-lg transition-all ${isSelected ? 'ring-2 ring-primary bg-primary/5' : 'border-border'}`}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-lg font-semibold">
                        {typeof product.name === 'object' ? product.name.es : product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {typeof product.description === 'object' ? product.description.es : product.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-red-600" />
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleProductToggle(product.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="scale-125"
                    />
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="space-y-6 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-primary">$19 USD</div>
                    <div className="text-sm text-muted-foreground">Descarga inmediata</div>
                  </div>
                  
                  {details && (
                    <>
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                          ✅ Sirve para:
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-sm bg-green-50 p-4 rounded-lg">
                          {details.fullDescription.es.serves.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                          ❌ No sirve para:
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-sm bg-red-50 p-4 rounded-lg">
                          {details.fullDescription.es.notServes.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          📋 Incluye:
                        </h4>
                        <ul className="space-y-2 text-sm bg-blue-50 p-4 rounded-lg">
                          {details.fullDescription.es.includes.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button
                          onClick={() => handleProductToggle(product.id)}
                          variant={isSelected ? "default" : "outline"}
                          className="w-full"
                        >
                          {isSelected ? "✅ Agregado al carrito" : "➕ Añadir al carrito"}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

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
              <Button
                variant="outline"
                size="sm"
                className="text-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar carrito
              </Button>
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
