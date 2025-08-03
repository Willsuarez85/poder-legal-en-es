import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Download } from "lucide-react";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderId = location.state?.orderId;
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
                Gracias por tu compra de: <span className="text-primary">{productName}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Número de Orden: <span className="font-mono">{orderId}</span>
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <span>Tu documento será enviado por email</span>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Download className="w-5 h-5" />
                <span>Descarga disponible por 30 días</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">¿Qué sigue?</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                <li>• Recibirás un email de confirmación en los próximos minutos</li>
                <li>• Tu documento personalizado será enviado dentro de 24 horas</li>
                <li>• El documento estará firmado y listo para usar</li>
                <li>• Guarda una copia para tus registros</li>
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