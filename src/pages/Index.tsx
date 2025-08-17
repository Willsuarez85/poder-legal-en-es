import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, FileText, Clock, CheckCircle, Star, Users, Heart, Lock, Phone, Download, Edit, ArrowRight, Quote, MessageCircle } from "lucide-react";
import testimonialMartha from "@/assets/testimonial-martha.jpg";
import testimonialCarlos from "@/assets/testimonial-carlos.jpg";
import testimonialLuis from "@/assets/testimonial-luis.jpg";
import testimonialAna from "@/assets/testimonial-ana.jpg";

const Index = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "1",
      title: "Responde el Quiz Rápido",
      description: "Encuentra la Carta de Poder que necesitas en 2 minutos",
      icon: Phone
    },
    {
      number: "2",
      title: "Descarga tu documento PDF",
      description: "A tu teléfono o email en minutos",
      icon: Download
    },
    {
      number: "3",
      title: "Recibe instrucciones en español",
      description: "Paso a paso para llenar y firmar con confianza",
      icon: Edit
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "📄 PDF 100% Legal y Válido en tu Estado",
      description: "Cartas de poder listas para firmar y notarizar, aceptadas por instituciones."
    },
    {
      icon: Clock,
      title: "⚡ Encuentra la Carta de Poder que Necesitas en Minutos",
      description: "Sin citas, sin esperas y sin pagar cientos de dólares a abogados. Descárgala hoy mismo."
    },
    {
      icon: Phone,
      title: "📱 Todo Desde tu Celular, Fácil y Seguro",
      description: "Evita trámites complicados. Obtén tu documento de forma privada y rápida."
    },
    {
      icon: Heart,
      title: "🇪🇸 Soporte 100% en Español",
      description: "Si tienes dudas, te guiamos paso a paso para llenarla correctamente."
    }
  ];

  const protections = [
    "Cuidar a tus hijos",
    "Acceder a tus cuentas",
    "Vender tu casa",
    "Tomar decisiones médicas",
    "Representarte legalmente en emergencias"
  ];

  const testimonials = [
    {
      text: "Cuando deportaron a mi esposo, no tenía acceso a nuestras cuentas. Si hubiéramos tenido una carta de poder, todo habría sido diferente.",
      author: "Martha R.",
      location: "Charlotte, NC"
    },
    {
      text: "Descargué mi documento en el celular y lo firmé el mismo día con mi esposa. Rápido y claro.",
      author: "Carlos H.",
      location: "Houston, TX"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Logo Header */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <img 
            src="/lovable-uploads/1e870570-7e2a-436f-95b4-d50755c085a0.png" 
            alt="Poder LegalUSA.com" 
            className="h-10 md:h-14 lg:h-20 xl:h-24 w-auto" 
            decoding="async" 
            loading="lazy" 
            sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, (max-width: 1280px) 200px, 240px" 
          />
          <a 
            href="https://wa.me/17042645084" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 bg-success hover:bg-success/90 text-success-foreground px-3 md:px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Atención al cliente 🇪🇸</span>
            <span className="sm:hidden">Soporte 🇪🇸</span>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-muted/30 py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Protege legalmente a tu familia, tu negocio y tus bienes en 
                <span className="text-primary"> Estados Unidos</span> en minutos
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Más de 120 formatos de <strong>Cartas de Poder PDF legales</strong> disponibles para todos los estados de EE.UU., listos para que lo puedas descargar, llenar y firmar en minutos con instrucciones claras en español.<br />📲 Solo contesta un quiz rápido y descarga tu documento legal correcto, hecho para tu estado y situación.
              </p>
              
              <p className="text-sm md:text-base text-muted-foreground">
                Sin abogados caros ni trámites confusos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all touch-manipulation w-full sm:w-auto"
                  onClick={() => navigate("/quiz")}
                >
                  <span className="text-center leading-tight">Encuentra la Carta que necesitas en 2 minutos</span>
                  <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Documentos Válidos en los 50 Estados 🇺🇸</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Incluye instrucciones en Español 🇪🇸</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/45832ed1-efe6-4dba-af5e-9d99059823cb.png" 
                  alt="Familia hispana protegida legalmente" 
                  className="w-full aspect-[4/3] lg:aspect-[3/2] xl:aspect-[4/3] object-cover" 
                  loading="eager" 
                  decoding="async" 
                  sizes="(min-width: 1024px) 50vw, 100vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats - Better positioned for desktop */}
              <div className="absolute -bottom-6 -left-6 bg-card text-card-foreground rounded-lg shadow-lg p-4 lg:p-5 hidden lg:block max-w-[200px] xl:max-w-[220px]">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 xl:w-10 xl:h-10 text-primary flex-shrink-0" />
                  <div>
                    <div className="font-bold text-lg xl:text-xl">+120</div>
                    <div className="text-xs xl:text-sm text-muted-foreground">Tipos de carta de poder legales</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-destructive text-destructive-foreground rounded-lg shadow-lg p-4 lg:p-5 hidden lg:block">
                <div className="text-center">
                  <div className="font-bold text-lg xl:text-xl">PDF Válidos 🇺🇸</div>
                  <div className="text-xs xl:text-sm opacity-90">Garantizado</div>
                </div>
              </div>

              {/* Mobile Stats - Better grid layout */}
              <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
                <div className="bg-card text-card-foreground rounded-lg shadow-md p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-bold text-lg">+120</div>
                  <div className="text-xs text-muted-foreground">Tipos de Carta de poder legales</div>
                </div>
                <div className="bg-destructive text-destructive-foreground rounded-lg shadow-md p-4 text-center">
                  <div className="font-bold text-lg">PDF Válidos 🇺🇸</div>
                  <div className="text-xs opacity-90">Documentos listos para descargar, llenar y firmar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-foreground">
              ¿Necesitas una Carta Poder pero no sabes por dónde empezar?
            </h2>
            
            <p className="text-base lg:text-lg text-muted-foreground mb-8 lg:mb-10">
              Muchos latinos en EE.UU. saben que deben tener una Carta Poder para proteger a sus hijos, su casa o su negocio...
              <br />
              <strong>pero no saben cómo hacerlo bien.</strong>
            </p>

            <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-10 text-left max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-lg">🔸</span>
                <p className="text-base lg:text-lg text-muted-foreground">
                  Algunos piensan que solo un abogado caro puede hacerlo.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🔸</span>
                <p className="text-base lg:text-lg text-muted-foreground">
                  Otros descargan plantillas gratis que no son válidas en su estado.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🔸</span>
                <p className="text-base lg:text-lg text-muted-foreground">
                  Y muchos terminan confiando en "notarios" o personas que prometen ayudar y solo entregan papeles inválidos.
                </p>
              </div>
            </div>

            <div className="bg-destructive/10 border-l-4 border-destructive rounded-lg p-6 lg:p-8">
              <p className="text-lg lg:text-xl font-semibold text-destructive flex items-center justify-center gap-2">
                <span>💥</span>
                El resultado: documentos mal hechos que no sirven cuando realmente los necesitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">Con Poder Legal USA, hacer tu Carta Poder es fácil, rápido y Seguro</h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">Solo responde un quiz sencillo en español y descarga el formato PDF legal correcto, válido en tu estado. Incluye instrucciones claras paso a paso para que lo puedas llenar, firmar y notarizar sin complicaciones.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="text-center border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                  <CardHeader className="pb-4 lg:pb-6">
                    <div className="mx-auto w-16 h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 lg:mb-6 relative">
                      <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-sm lg:text-base font-bold">
                        {step.number}
                      </div>
                    </div>
                    <CardTitle className="text-lg lg:text-xl font-bold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm lg:text-base">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12 lg:mt-16">
            <Button 
              size="lg" 
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8 lg:px-10 py-4 lg:py-6 text-base lg:text-lg font-semibold touch-manipulation"
              onClick={() => navigate("/quiz")}
            >
              Comenzar ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              ¿Qué beneficios obtienes con Poder Legal USA?
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              Te ayudamos a proteger a tu familia y tu patrimonio con documentos legales en español, fáciles de entender y
              listos para usar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                  <CardHeader className="pb-4 lg:pb-6">
                    <div className="mx-auto w-16 h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                      <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                    </div>
                    <CardTitle className="text-lg lg:text-xl font-bold">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm lg:text-base">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              ¿Para qué te sirve una Carta Poder en Estados Unidos?
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              Una Carta Poder te permite proteger a tus seres queridos y tus bienes en caso de que no puedas estar presente.
              Aquí te damos algunos ejemplos:
            </p>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {protections.map((protection, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="data-[state=open]:text-foreground">{protection}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Con una Carta Poder, puedes designar a una persona de confianza para que te represente en caso de que no
                    puedas hacerlo tú mismo.
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              No confíes solo en nuestra palabra. Escucha lo que dicen nuestros clientes sobre Poder Legal USA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-4">
                    <Quote className="w-6 h-6 text-muted-foreground" />
                    {testimonial.author}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                  <div className="text-sm text-muted-foreground">— {testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
              ¿Listo para proteger a tu familia y tu patrimonio?
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 lg:mb-10">
              Comienza ahora mismo y descarga la Carta Poder que necesitas en minutos.
            </p>
            <Button
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8 lg:px-10 py-4 lg:py-6 text-base lg:text-lg font-semibold touch-manipulation"
              onClick={() => navigate("/quiz")}
            >
              Obtén tu Carta Poder ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 bg-card text-card-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Poder Legal USA. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="/terminos-y-condiciones" className="text-sm text-muted-foreground hover:underline">
                Términos y Condiciones
              </a>
              <a href="/politica-de-privacidad" className="text-sm text-muted-foreground hover:underline">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
