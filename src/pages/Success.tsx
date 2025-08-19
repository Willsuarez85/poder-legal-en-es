import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Download, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [isWebhookSent, setIsWebhookSent] = useState<boolean>(false);
  const [isWebhookLoading, setIsWebhookLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Get order ID from URL params or location state
    const urlParams = new URLSearchParams(location.search);
    const orderIdFromUrl = urlParams.get('order_id');
    const orderIdFromState = location.state?.orderId;
    
    const finalOrderId = orderIdFromUrl || orderIdFromState;
    setOrderId(finalOrderId);
    
    // Load saved webhook URL from localStorage
    const savedWebhookUrl = localStorage.getItem('webhook_url');
    if (savedWebhookUrl) {
      setWebhookUrl(savedWebhookUrl);
    }
  }, [location]);

  const handleSendWebhook = async () => {
    if (!orderId) {
      toast({
        title: "Error",
        description: "No se encontró el ID de la orden",
        variant: "destructive",
      });
      return;
    }

    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Por favor ingresa la URL del webhook",
        variant: "destructive",
      });
      return;
    }

    setIsWebhookLoading(true);

    try {
      // Save webhook URL to localStorage
      localStorage.setItem('webhook_url', webhookUrl);

      const { data, error } = await supabase.functions.invoke('send-webhook', {
        body: {
          orderId: orderId,
          webhookUrl: webhookUrl
        }
      });

      if (error) {
        throw error;
      }

      setIsWebhookSent(true);
      toast({
        title: "Éxito",
        description: "Webhook enviado correctamente",
      });

    } catch (error) {
      console.error("Error sending webhook:", error);
      toast({
        title: "Error",
        description: "Error al enviar el webhook: " + (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    } finally {
      setIsWebhookLoading(false);
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
                onClick={() => window.open(`https://wa.me/1234567890?text=Hola, necesito ayuda con mi orden #${orderId}`, '_blank')}
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

        {/* Webhook Section */}
        <Card className="w-full max-w-2xl mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Notificación Webhook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="webhook-url" className="block text-sm font-medium mb-2">
                URL del Webhook
              </label>
              <input
                id="webhook-url"
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isWebhookSent}
              />
            </div>
            
            <Button 
              onClick={handleSendWebhook} 
              disabled={!webhookUrl || isWebhookLoading || isWebhookSent}
              className="w-full"
            >
              {isWebhookLoading ? "Enviando..." : isWebhookSent ? "Webhook Enviado ✓" : "Enviar Webhook"}
            </Button>
            
            {isWebhookSent && (
              <div className="text-green-600 text-sm text-center">
                ✓ El webhook se envió correctamente con los datos de la orden
              </div>
            )}
            
            <div className="text-sm text-gray-600">
              <p><strong>Orden ID:</strong> {orderId}</p>
              <p>El webhook enviará los datos completos de la orden incluyendo información del cliente y productos.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;