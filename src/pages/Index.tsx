// Update this page (the content is just a fallback if you fail to update the page)

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Shield, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Scale,
      title: "Asesoramiento Legal Personalizado",
      description: "Obtén recomendaciones específicas basadas en tu situación y estado."
    },
    {
      icon: FileText,
      title: "Documentos Profesionales",
      description: "Documentos legales adaptados a las leyes de tu estado específico."
    },
    {
      icon: Shield,
      title: "Protección Garantizada",
      description: "Todos nuestros documentos están verificados por abogados licenciados."
    },
    {
      icon: CheckCircle,
      title: "Proceso Sencillo",
      description: "Completa un cuestionario y recibe tus documentos instantáneamente."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Poder Legal Digital
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Obtén documentos legales personalizados para tu estado de forma rápida y segura.
            Nuestro cuestionario inteligente te guiará hacia la solución perfecta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => navigate("/quiz")}
            >
              Comenzar Cuestionario
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => navigate("/products")}
            >
              Ver Documentos
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir nuestro servicio?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simplificamos el proceso legal para que puedas obtener los documentos que necesitas
            sin complicaciones ni gastos excesivos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para obtener tus documentos legales?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro proceso toma menos de 10 minutos. Responde algunas preguntas
            y recibe documentos personalizados para tu situación específica.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => navigate("/quiz")}
          >
            Empezar Ahora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
