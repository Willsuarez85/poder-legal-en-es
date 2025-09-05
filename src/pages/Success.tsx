import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Download, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MetaPixel } from "@/lib/metaPixel";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [purchasedProducts, setPurchasedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Get order ID from URL params or location state
    const urlParams = new URLSearchParams(location.search);
    const orderIdFromUrl = urlParams.get('order_id');
    const orderIdFromState = location.state?.orderId;
    
    console.log("DEBUG Success page:");
    console.log("URL search params:", location.search);
    console.log("Order ID from URL:", orderIdFromUrl);
    console.log("Order ID from state:", orderIdFromState);
    
    const finalOrderId = orderIdFromUrl || orderIdFromState;
    console.log("Final Order ID:", finalOrderId);
    setOrderId(finalOrderId);
    
    // Load purchased products if we have an order ID
    if (finalOrderId) {
      console.log("Loading products for order:", finalOrderId);
      loadPurchasedProducts(finalOrderId);
    } else {
      console.log("No order ID found, setting loading to false");
      setLoading(false);
    }
  }, [location]);

  const loadPurchasedProducts = async (orderIdValue: string) => {
    try {
      console.log("Loading products for order:", orderIdValue);
      
      // Use edge function to get order products securely
      const { data, error } = await supabase.functions.invoke('get-order-products', {
        body: { orderId: orderIdValue }
      });

      console.log("Order products result:", { data, error });

      if (error) {
        console.error("Failed to load order products:", error);
        console.error("Error details:", error.message, error.stack);
        
        // Check if it's a connection error
        if (error.message?.includes('ERR_CONNECTION_CLOSED') || error.message?.includes('Failed to fetch')) {
          toast({
            title: "Error de conexión",
            description: "No se pudo conectar al servidor. Los productos se mostrarán cuando el servidor esté disponible.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: "No se pudieron cargar los productos de la orden.",
            variant: "destructive"
          });
        }
        setLoading(false);
        return;
      }

      if (data?.products) {
        console.log("Setting purchased products:", data.products);
        setPurchasedProducts(data.products);
        
        // Track purchase event for Meta Pixel
        const totalValue = data.products.reduce((sum: number, product: any) => sum + (product.price || 0), 0);
        const productIds = data.products.map((product: any) => product.id);
        const productNames = data.products.map((product: any) => 
          typeof product.name === 'object' ? product.name.es || product.name.en : product.name
        );
        
        MetaPixel.trackPurchase({
          value: totalValue,
          currency: 'USD',
          content_ids: productIds,
          content_type: 'product',
          content_name: productNames.join(', '),
          content_category: 'legal_documents',
          num_items: data.products.length
        });
      } else {
        console.log("No products found in order");
        setPurchasedProducts([]);
      }
    } catch (error: any) {
      console.error("Error loading purchased products:", error);
      console.error("Error type:", typeof error);
      console.error("Error message:", error?.message);
      
      // More specific error handling
      if (error?.message?.includes('ERR_CONNECTION_CLOSED') || 
          error?.message?.includes('Failed to fetch') ||
          error?.name === 'TypeError') {
        toast({
          title: "Error de conexión",
          description: "El servidor no está disponible en este momento. Intenta recargar la página.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Error al cargar los productos.",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadProduct = async (productId: string, productName: string) => {
    try {
      if (!orderId) return;

      const { data, error } = await supabase.functions.invoke('generate-pdf-url', {
        body: { orderId, productId }
      });

      if (error) {
        console.error("Error generating download URL:", error);
        toast({
          title: "Error",
          description: "No se pudo generar el enlace de descarga. Intenta de nuevo.",
          variant: "destructive"
        });
        return;
      }

      if (data?.downloadUrl) {
        // Log the temporary URL for debugging
        console.log('Generated temporary URL:', data.downloadUrl);
        console.log('URL expires at:', data.expiresAt);
        
        // Open download in new tab
        window.open(data.downloadUrl, '_blank');
        toast({
          title: "Descarga iniciada",
          description: `Descargando ${productName}... (válida por 1 hora)`
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Error",
        description: "Error al descargar el archivo. Intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  const productName = location.state?.productName;

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <p className="text-muted-foreground">Información de orden no encontrada.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">
              ¡Compra Completada Exitosamente!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-lg font-medium">
                ¡Pago exitoso!
              </p>
              <p className="text-sm text-muted-foreground">
                Número de Orden: <span className="font-mono font-bold">#{orderId}</span>
              </p>
            </div>

            {/* Downloaded Products Section */}
            {!loading && purchasedProducts.length > 0 && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-center gap-3 text-green-800 dark:text-green-200">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Tus documentos están listos</span>
                </div>
                
                <div className="space-y-3">
                  {purchasedProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded border">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {typeof product.name === 'object' ? product.name.es || product.name.en : product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Estado: {product.state?.toUpperCase()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => downloadProduct(product.id, typeof product.name === 'object' ? product.name.es || product.name.en : product.name)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  ))}
                </div>
                
                <p className="text-green-700 dark:text-green-300 text-xs text-center">
                  Los enlaces de descarga son válidos por 1 hora. Si necesitas descargar nuevamente, 
                  contáctanos con tu número de orden.
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-gray-50 dark:bg-gray-900 border rounded-lg p-6">
                <p className="text-center text-muted-foreground">Cargando tus documentos...</p>
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-center gap-3 text-blue-800 dark:text-blue-200">
                <Mail className="w-5 h-5" />
                <span className="font-medium">Estamos preparando tu orden</span>
              </div>
              
              <p className="text-blue-700 dark:text-blue-300 text-sm text-center">
                Tu orden será enviada por email en unos minutos. Si no la encuentras o no tienes acceso,
              </p>
              
              <p className="text-blue-800 dark:text-blue-200 text-sm font-medium text-center">
                ¿Deseas que te la enviemos por WhatsApp?
              </p>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open(`https://wa.me/15558286861?text=Hola, necesito ayuda con mi orden #${orderId}`, '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Conectar con nuestro equipo por WhatsApp
              </Button>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                <strong>Importante:</strong> Proporciona tu número de orden <span className="font-mono font-bold">#{orderId}</span> a nuestro equipo 
                y en unas horas te enviaremos todo por WhatsApp.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">⏰ Qué esperar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                <li>• Email con documentos: 5-15 minutos</li>
                <li>• WhatsApp alternativo: 1-3 horas</li>
                <li>• Documentos listos para completar</li>
                <li>• Instrucciones de llenado incluidas</li>
              </ul>
            </div>

            <div className="space-y-3 pt-6">
              <Button 
                className="w-full"
                onClick={() => navigate("/")}
              >
                Volver al Inicio
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/products")}
              >
                Ver Más Documentos
              </Button>
            </div>

            <div className="pt-4 text-xs text-muted-foreground">
              <p>
                ¿Tienes preguntas? Contáctanos y te ayudaremos con cualquier duda sobre tu documento.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;