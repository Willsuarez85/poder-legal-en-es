import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="space-y-6">
            <div className="text-6xl">⚖️</div>
            <CardTitle className="text-3xl font-bold">
              ¿Cuál Carta de Poder necesitas para proteger lo que más amas?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Contesta 4 preguntas fáciles y en menos de 2 minutos sabrás qué documentos legales 
              necesitas para proteger tu familia, tus bienes y tu tranquilidad.
            </p>
            <Button 
              onClick={onStart} 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
            >
              🚀 Iniciar Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};