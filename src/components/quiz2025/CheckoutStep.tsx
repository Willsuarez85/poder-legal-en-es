import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizAnswers } from "@/pages/Quiz2025";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

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

export const CheckoutStep = ({ answers, onPrev }: CheckoutStepProps) => {
  const [selectedProductsData, setSelectedProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
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
        .select('*')
        .in('id', answers.selected_products);
      
      if (data) {
        setSelectedProductsData(data);
      }
      setLoading(false);
    };

    fetchSelectedProducts();
  }, [answers.selected_products]);

  const totalAmount = selectedProductsData.reduce((sum, product) => sum + product.price, 0);

  const handleCheckout = async () => {
    setProcessing(true);
    
    try {
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
            name: 'Quiz Customer',
            phone: '',
            email: 'quiz@poderlegal.com'
          }
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Clear quiz data from localStorage
        localStorage.removeItem('quiz2025_answers');
        
        // Open checkout in new tab
        window.open(data.url, '_blank');
        
        toast({
          title: "¡Redirigiendo al pago!",
          description: "Se ha abierto una nueva pestaña con el checkout de Stripe"
        });
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
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Productos seleccionados:</h3>
            {selectedProductsData.map((product) => (
              <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">
                    {typeof product.name === 'object' ? product.name.es : product.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Estado: {answers.state.charAt(0).toUpperCase() + answers.state.slice(1)}
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

          <div className="space-y-4">
            <h3 className="font-semibold">Resumen de tu selección:</h3>
            <div className="text-sm space-y-2">
              <p><strong>Estado:</strong> {answers.state.charAt(0).toUpperCase() + answers.state.slice(1)}</p>
              <p><strong>ID Otorgante:</strong> {answers.grantor_id}</p>
              <p><strong>ID Apoderado:</strong> {answers.grantee_id}</p>
              <p><strong>Vigencia:</strong> {answers.effective_time === 'immediate' ? 'Inmediatamente' : 'Circunstancia específica'}</p>
            </div>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onPrev}>
              ⬅️ Anterior
            </Button>
            <Button
              onClick={handleCheckout}
              disabled={processing || selectedProductsData.length === 0}
              className="px-8"
              style={{ backgroundColor: '#de1f27' }}
            >
              {processing ? 'Procesando...' : 'Pagar y Descargar'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};