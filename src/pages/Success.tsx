import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, Download, MessageCircle, Shield, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MetaPixel } from "@/lib/metaPixel";
import { GTM } from "@/lib/gtm";
import { URLParams } from "@/lib/urlParams";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [purchasedProducts, setPurchasedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [requiresEmailVerification, setRequiresEmailVerification] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const { toast } = useToast();
  
  // Track page view and capture URL parameters on component mount
  useEffect(() => {
    // Capture URL parameters (GCLID, UTM, etc.) first
    URLParams.captureParams();
    
    // Then track page view (will include captured parameters)
    GTM.trackPageView('/success');
    
    // Debug in development
    if (process.env.NODE_ENV === 'development') {
      URLParams.debugParams();
    }
  }, []);
  
  useEffect(() => {
    const getOrderData = async () => {
      const urlParams = new URLSearchParams(location.search);
      const sessionId = urlParams.get('session_id');
      const orderIdFromUrl = urlParams.get('order_id');
      const accessTokenFromUrl = urlParams.get('access_token');
      const orderIdFromState = location.state?.orderId;
      
      // If we have session_id, use it to get order data
      if (sessionId) {
        try {
          const { data, error } = await supabase.functions.invoke('get-order-by-session', {
            body: { sessionId }
          });

          if (error) {
            console.error("Error getting order by session:", error);
            setLoading(false);
            return;
          }

          if (data?.orderId && data?.accessToken) {
            setOrderId(data.orderId);
            setAccessToken(data.accessToken);
            loadPurchasedProducts(data.orderId, data.accessToken);
            return;
          }
        } catch (error) {
          console.error("Error calling get-order-by-session:", error);
          setLoading(false);
          return;
        }
      }

      // Fallback to URL params or state (for backward compatibility)
      const finalOrderId = orderIdFromUrl || orderIdFromState;
      const finalAccessToken = accessTokenFromUrl;
      
      setOrderId(finalOrderId);
      setAccessToken(finalAccessToken);
      
      if (finalOrderId && finalAccessToken) {
        loadPurchasedProducts(finalOrderId, finalAccessToken);
      } else {
        setLoading(false);
      }
    };

    getOrderData();
  }, [location]);

  const loadPurchasedProducts = async (orderIdValue: string, accessTokenValue: string, customerEmailValue?: string) => {
    try {
      console.log('Loading products with email:', customerEmailValue ? 'PROVIDED' : 'NOT PROVIDED');
      
      // Use enhanced edge function with customer email verification
      const { data, error } = await supabase.functions.invoke('get-order-products', {
        body: { 
          orderId: orderIdValue, 
          accessToken: accessTokenValue,
          customerEmail: customerEmailValue // Enhanced security validation
        }
      });

      if (error) {
        console.error("Error details:", error.message, error.stack);
        
        // Handle different types of security errors
        if (error.message?.includes('email_mismatch')) {
          setRequiresEmailVerification(true);
          toast({
            title: "Verificación de Email Requerida",
            description: "Para acceder a su orden, por favor ingrese el email que utilizó para la compra.",
            variant: "default"
          });
        } else if (error.message?.includes('token_expired')) {
          toast({
            title: "Acceso Expirado",
            description: "Su enlace de acceso ha expirado (válido por 24 horas). Contacte a soporte con su número de orden.",
            variant: "destructive"
          });
        } else if (error.message?.includes('rate_limit_exceeded')) {
          toast({
            title: "Demasiados Intentos",
            description: "Ha excedido el límite de intentos. Espere 15 minutos antes de intentar nuevamente.",
            variant: "destructive"
          });
        } else if (error.message?.includes('invalid_token')) {
          toast({
            title: "Acceso No Válido",
            description: "El enlace de acceso no es válido. Contacte a soporte con su número de orden.",
            variant: "destructive"
          });
        } else if (error.message?.includes('ERR_CONNECTION_CLOSED') || error.message?.includes('Failed to fetch')) {
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
        setPurchasedProducts(data.products);
        setCustomerInfo(data.customerInfo);
        setEmailVerified(true);
        
        // CRITICAL FIX: Persist the verified email in state
        if (customerEmailValue && !customerEmail) {
          console.log('Setting customer email from verification:', customerEmailValue);
          setCustomerEmail(customerEmailValue);
        }
        
        // Show security warning if suspicious IP detected
        if (data.customerInfo?.suspiciousAccess) {
          toast({
            title: "⚠️ Acceso desde Nueva Ubicación",
            description: "Se detectó acceso desde una nueva ubicación. Si no fue usted, contacte a soporte inmediatamente.",
            variant: "destructive"
          });
        }
        
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

        // Track purchase event for GTM
        GTM.trackPurchase({
          value: totalValue,
          currency: 'USD',
          transaction_id: orderId,
          items: data.products.map((product: any) => ({
            item_id: product.id,
            item_name: typeof product.name === 'object' ? product.name.es || product.name.en : product.name,
            price: product.price || 0,
            quantity: 1
          }))
        });
      } else {
        setPurchasedProducts([]);
      }
    } catch (error: any) {
      // Error loading purchased products
      
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

  const verifyEmailAndLoadProducts = async () => {
    if (!orderId || !accessToken || !customerEmail.trim()) {
      toast({
        title: "Email Requerido",
        description: "Por favor ingrese su dirección de email para verificar su identidad.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    await loadPurchasedProducts(orderId, accessToken, customerEmail.trim());
  };

  const downloadProduct = async (productId: string, productName: string) => {
    try {
      if (!orderId || !accessToken) return;

      console.log('Initiating download for product:', productId);

      const { data, error } = await supabase.functions.invoke('generate-pdf-url', {
        body: { 
          orderId, 
          productId, 
          accessToken,
          customerEmail: customerEmail.trim() || undefined // Optional email for validation
        }
      });

      if (error) {
        console.error("Download error:", error);
        
        // Handle different security error types  
        if (error.message?.includes('email_mismatch') && !emailVerified) {
          // If email mismatch and not verified, prompt for email verification
          console.log('Email verification needed - prompting user');
          setRequiresEmailVerification(true);
          toast({
            title: "Verificación de Email",
            description: "Para mayor seguridad, ingrese el email que utilizó para la compra.",
            variant: "default"
          });
        } else if (error.message?.includes('token_expired')) {
          toast({
            title: "Acceso Expirado",
            description: "Su acceso a los documentos ha expirado (24 horas). Contacte a soporte con su número de orden.",
            variant: "destructive"
          });
        } else if (error.message?.includes('rate_limit_exceeded')) {
          toast({
            title: "Demasiados Intentos",
            description: "Ha excedido el límite de descargas. Espere 15 minutos antes de intentar nuevamente.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: "No se pudo generar el enlace de descarga. Intenta de nuevo.",
            variant: "destructive"
          });
        }
        return;
      }

      if (data?.downloadUrl) {
        console.log('Download successful - opening URL');
        
        // Open download in new tab
        window.open(data.downloadUrl, '_blank');
        toast({
          title: "Descarga iniciada",
          description: `Descargando ${productName}... (válida por 1 hora por seguridad)`
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

  if (!orderId || !accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <p className="text-muted-foreground">Información de orden no encontrada o acceso no autorizado.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show email verification form if required
  if (requiresEmailVerification && !emailVerified) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl text-blue-700">
                Verificación de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Para proteger su información personal, necesitamos verificar su identidad.
                  Ingrese el email que utilizó para realizar la compra.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email de la Orden</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="ejemplo@email.com"
                  disabled={loading}
                />
              </div>
              
              <Button 
                onClick={verifyEmailAndLoadProducts}
                disabled={loading || !customerEmail.trim()}
                className="w-full"
              >
                {loading ? "Verificando..." : "Verificar y Acceder"}
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Número de Orden: <span className="font-mono font-bold">#{orderId}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
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
              {customerInfo?.emailMasked && (
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Email: <span className="font-mono">{customerInfo.emailMasked}</span>
                </p>
              )}
              {customerInfo?.suspiciousAccess && (
                <div className="flex items-center gap-2 text-amber-600 text-xs">
                  <AlertTriangle className="w-3 h-3" />
                  Acceso desde nueva ubicación detectado
                </div>
              )}
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
                  Los enlaces de descarga son válidos por 1 hora por seguridad. El acceso a su orden expira en 24 horas. 
                  Si necesita descargar nuevamente después de este tiempo, contáctanos con su número de orden.
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
                Tu orden será enviada por email en unos minutos. Si no la encuentras o necesitas ayuda, 
                contáctanos a <span className="font-medium">soporte@poderlegalusa.com</span> con tu número de orden.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-amber-800 dark:text-amber-200 text-sm text-center">
                <strong>Importante:</strong> Incluye tu número de orden <span className="font-mono font-bold">#{orderId}</span> cuando nos contactes 
                por email para obtener soporte rápido.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">⏰ Qué esperar:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                <li>• Email con documentos: 5-15 minutos</li>
                <li>• Documentos listos para completar</li>
                <li>• Instrucciones de llenado incluidas</li>
                <li>• Soporte por email disponible</li>
              </ul>
            </div>

            <div className="space-y-3 pt-6">
              <Button 
                className="w-full"
                onClick={() => navigate("/")}
              >
                Volver al Inicio
              </Button>
            </div>

            <div className="pt-4 text-xs text-muted-foreground">
              <p>
                ¿Tienes preguntas? Escríbenos a <span className="font-medium">soporte@poderlegalusa.com</span> y te ayudaremos con cualquier duda sobre tu documento.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;