import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PhoneInput } from "@/components/ui/phone-input";
import { QuizAnswers } from "@/pages/Quiz2025";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { MetaPixel } from "@/lib/metaPixel";

interface CheckoutStepProps {
  answers: QuizAnswers;
  onPrev: () => void;
}

interface Product {
  id: string;
  name: any;
  description: any;
  price: number;
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

export const CheckoutStep = ({ answers, onPrev }: CheckoutStepProps) => {
  const [selectedProductsData, setSelectedProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: ""
  });
  const { addItem, clear } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSelectedProducts = async () => {
      if (answers.selected_products.length === 0) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('products')
        .select('id, name, description, price, state, label, recommendation_criteria')
        .in('id', answers.selected_products);
      
      if (data) {
        setSelectedProductsData(data);
      }
      setLoading(false);
    };

    fetchSelectedProducts();
  }, [answers.selected_products]);

  const totalAmount = selectedProductsData.reduce((sum, product) => sum + product.price, 0);

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return false;
    
    // Check for USA phone number (1 + 10 digits)
    if (phone.startsWith("1") && phone.length === 11) {
      return true;
    }
    
    // Check for Colombia phone number (57 + 10 digits)
    if (phone.startsWith("57") && phone.length === 12) {
      return true;
    }
    
    return false;
  };

  const validateForm = () => {
    if (!customerData.name.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor ingresa tu nombre completo",
        variant: "destructive",
      });
      return false;
    }
    
    if (!customerData.email.trim() || !customerData.email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      });
      return false;
    }

    if (!validatePhone(customerData.phone)) {
      toast({
        title: "Teléfono inválido",
        description: "Por favor ingresa un número de teléfono válido (USA o Colombia)",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
    setProcessing(true);
    
    try {
      // Track InitiateCheckout event for Meta Pixel
      const totalValue = selectedProductsData.reduce((sum, product) => sum + product.price, 0);
      const productIds = selectedProductsData.map(product => product.id);
      const productNames = selectedProductsData.map(product => 
        typeof product.name === 'object' ? product.name.es : product.name
      );
      
      MetaPixel.trackInitiateCheckout({
        value: totalValue,
        currency: 'USD',
        content_ids: productIds,
        content_type: 'product',
        content_name: productNames.join(', '),
        content_category: 'legal_documents',
        num_items: selectedProductsData.length
      });
      
      // Clear existing cart and add selected products
      clear();
      
      selectedProductsData.forEach(product => {
        addItem({
          productId: product.id,
          name: typeof product.name === 'object' ? product.name.es : product.name,
          price: product.price,
          quantity: 1,
          state: answers.state
        });
      });

      // Create payment session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items: selectedProductsData.map(product => ({
            productId: product.id,
            quantity: 1
          })),
          customerData: {
            name: customerData.name,
            phone: customerData.phone,
            email: customerData.email
          },
          quizData: {
            state: answers.state,
            selected_products: answers.selected_products,
            effective_time: answers.effective_time
          }
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Clear quiz data from localStorage
        localStorage.removeItem('quiz2025_answers');
        
        // Redirect to checkout in the same tab
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: "Error en el checkout",
        description: "Hubo un problema procesando tu pago. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando detalles de compra...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Confirma tu orden
          </CardTitle>
          <p className="text-center text-muted-foreground mt-2">
            Recibirás plantillas PDF autollenables con instrucciones paso a paso en español
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>📱 Descarga inmediata:</strong> Recibirás tus documentos en tu email en menos de 2 minutos. 
              Incluyen plantillas autollenables e instrucciones detalladas para llenar, firmar y notarizar en cualquier estado de USA.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Documentos que recibirás:</h3>
            {selectedProductsData.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">
                    {typeof product.name === 'object' ? product.name.es : product.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Plantilla PDF autollenable • Válido en {answers.state.charAt(0).toUpperCase() + answers.state.slice(1)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold">${product.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Tu información (para enviarte los documentos):</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Nombre Completo *</Label>
                <Input
                  id="customer-name"
                  value={customerData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-email">Email *</Label>
                <Input
                  id="customer-email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="tu@email.com (aquí recibirás tus documentos)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer-phone">Teléfono *</Label>
                <PhoneInput
                  id="customer-phone"
                  value={customerData.phone}
                  onChange={(value) => handleInputChange("phone", value)}
                  placeholder="(555)123-4567"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Lo que incluye tu compra:</h3>
            <ul className="text-sm space-y-1">
              <li>✅ {answers.selected_products.length} Plantilla{answers.selected_products.length > 1 ? 's' : ''} PDF autollenable{answers.selected_products.length > 1 ? 's' : ''}</li>
              <li>✅ Instrucciones paso a paso en español</li>
              <li>✅ Guía para notarizar en {answers.state.charAt(0).toUpperCase() + answers.state.slice(1).replace('-', ' ')}</li>
              <li>✅ Válido legalmente en todos los estados de USA</li>
              <li>✅ Soporte por email si tienes dudas</li>
            </ul>
          </div>

          <div className="pt-6 space-y-4">
            <Button
              onClick={handleCheckout}
              disabled={processing || selectedProductsData.length === 0}
              className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              style={{ backgroundColor: '#de1f27' }}
            >
              {processing ? 'Procesando...' : 'Pagar y Descargar'}
            </Button>
            
            <div className="text-center">
              <button
                onClick={onPrev}
                className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
              >
                ← Regresar
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};