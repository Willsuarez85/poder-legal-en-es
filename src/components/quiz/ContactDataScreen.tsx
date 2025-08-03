import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface ContactDataScreenProps {
  onComplete: (data: { name: string; phone: string }) => void;
}

export const ContactDataScreen = ({ onComplete }: ContactDataScreenProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Datos requeridos",
        description: "Por favor completa tu nombre y teléfono",
        variant: "destructive",
      });
      return;
    }

    if (!consent) {
      toast({
        title: "Consentimiento requerido",
        description: "Por favor acepta recibir mensajes para continuar",
        variant: "destructive",
      });
      return;
    }

    onComplete({ name: name.trim(), phone: phone.trim() });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="text-4xl">🟣</div>
            <CardTitle className="text-2xl font-bold">
              ¡Ya casi! Déjanos tus datos para mostrarte tus documentos
            </CardTitle>
            <p className="text-muted-foreground">
              Completa tu nombre y WhatsApp para ver al instante los documentos que necesitas 
              y descargarlos desde tu celular.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
              />
              <Label htmlFor="consent" className="text-sm leading-relaxed">
                Acepto recibir mensajes de Poder Legal USA. No compartimos tu información.
              </Label>
            </div>

            <Button 
              onClick={handleSubmit} 
              className="w-full text-lg py-6 h-auto"
            >
              📄 Ver mis documentos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};