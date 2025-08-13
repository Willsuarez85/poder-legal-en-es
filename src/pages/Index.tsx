import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Shield, 
  FileText, 
  Clock, 
  CheckCircle, 
  Star,
  Users,
  Heart,
  Lock,
  Phone,
  Download,
  Edit,
  ArrowRight,
  Quote
} from "lucide-react";
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
      title: "PDF listo para firmar y notarizar",
      description: "Documentos válidos en todos los estados de USA"
    },
    {
      icon: Clock,
      title: "En Minutos, No Meses",
      description: "Sin abogados caros, ni trámites confusos"
    },
    {
      icon: Phone,
      title: "Todo en tu Celular",
      description: "Proceso 100% digital y móvil"
    },
    {
      icon: Heart,
      title: "En Español",
      description: "Instrucciones claras en tu idioma"
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
            className="h-12 md:h-16 lg:h-36 w-auto"
            decoding="async" loading="lazy" sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, 200px"
          />
          <Badge variant="secondary" className="text-sm font-medium flex items-center gap-2">
            <span className="text-2xl">🇺🇸</span>
            <span>Válidos 50 estados</span>
            <div className="flex">
              <Star className="w-4 h-4 text-accent" />
              <Star className="w-4 h-4 text-accent" />
              <Star className="w-4 h-4 text-accent" />
              <Star className="w-4 h-4 text-accent" />
              <Star className="w-4 h-4 text-accent" />
            </div>
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-muted/30 py-8 md:py-16 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Protege legalmente a tu familia, tu negocio y tus bienes en 
                <span className="text-primary"> Estados Unidos</span> en minutos
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Encuentra la carta de poder que necesitas, lista para descargar en PDF y llenar fácilmente con instrucciones en español.
              </p>
              
              <p className="text-base text-muted-foreground">
                Sin abogados caros, ni trámites confusos. Todo en tu celular.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all min-h-[48px] touch-manipulation"
                  onClick={() => navigate("/quiz")}
                >
                  <span className="hidden sm:inline">Encuentra la Carta que necesitas en 2 minutos</span>
                  <span className="sm:hidden">Encuentra tu Carta en 2 min</span>
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>100% Legal</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>En Español</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Descarga Inmediata</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/45832ed1-efe6-4dba-af5e-9d99059823cb.png" 
                  alt="Familia hispana protegida legalmente" 
                  className="w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] object-cover"
                  loading="eager" decoding="async" sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats - Hidden on mobile, positioned better */}
              <div className="absolute -bottom-4 -left-4 bg-card text-card-foreground rounded-lg shadow-lg p-3 lg:p-4 hidden lg:block">
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                  <div>
                    <div className="font-bold text-base lg:text-lg">+100</div>
                    <div className="text-xs lg:text-sm text-muted-foreground max-w-[120px]">Tipos de carta de poder legales en USA</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-destructive text-destructive-foreground rounded-lg shadow-lg p-3 lg:p-4 hidden lg:block">
                <div className="text-center">
                  <div className="font-bold text-base lg:text-lg">100% Legal</div>
                  <div className="text-xs lg:text-sm opacity-90">Garantizado</div>
                </div>
              </div>

              {/* Mobile Stats - Visible below image on small screens */}
              <div className="lg:hidden mt-6 grid grid-cols-2 gap-4">
                <div className="bg-card text-card-foreground rounded-lg shadow-md p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-bold text-lg">+100</div>
                  <div className="text-xs text-muted-foreground">Tipos de documentos legales</div>
                </div>
                <div className="bg-destructive text-destructive-foreground rounded-lg shadow-md p-4 text-center">
                  <div className="font-bold text-lg">100% Legal</div>
                  <div className="text-xs opacity-90">Garantizado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Protege lo que amas en 3 pasos:
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proceso simple y rápido para obtener tu protección legal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="text-center border-2 hover:border-primary/20 transition-all hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative">
                      <IconComponent className="w-8 h-8 text-primary" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {step.number}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive min-h-[48px] px-8 touch-manipulation"
              onClick={() => navigate("/quiz")}
            >
              Comenzar ahora
            </Button>
          </div>
        </div>
      </section>

      {/* What is Power of Attorney Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Qué es una Carta de Poder?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                Una <strong>carta de poder</strong> (también llamada poder notarial) es un 
                <strong> documento legal</strong> que te protege si tú no puedes actuar por ti mismo.
              </p>

              <p className="text-lg text-muted-foreground mb-8">
                Este documento le da <strong>acceso y autoridad legal</strong> a una persona 
                de tu confianza para actuar en tu nombre:
              </p>

              <div className="space-y-3 mb-8">
                {protections.map((protection, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{protection}</span>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground">
                Ya sea por un viaje, una enfermedad, un accidente o una deportación, 
                tener una carta de poder garantiza que alguien de tu confianza pueda 
                ayudarte sin trabas legales.
              </p>
            </div>

            <div className="relative h-full flex items-center justify-center px-4">
              <img 
                src="/lovable-uploads/eada516d-b5cc-4db8-87be-f593105d8612.png" 
                alt="Aplicación móvil de documentos legales Power of Attorney" 
                className="w-full max-w-md mx-auto h-auto object-contain"
                loading="lazy" decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Column - Left */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/b5323911-7320-4399-ab20-e69e6e5fa1ac.png" 
                  alt="Pareja hispana firmando documentos legales en casa" 
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                  loading="lazy" decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20"></div>
              </div>
            </div>

            {/* Content Column - Right */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Te has preguntado qué pasaría si algo te pasa?
              </h2>
              
              <p className="text-lg mb-8 opacity-90">
                Si sufres una deportación, accidente o enfermedad, tu familia:
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                  <span>No podrá acceder a tus cuentas ni pagar tus gastos</span>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                  <span>No podrá tomar decisiones médicas urgentes</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                  <span>No podrá cuidar legalmente de tus hijos</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-destructive mt-1 flex-shrink-0" />
                  <span>Tendrá que gastar miles de dólares y esperar meses en la corte</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  Con un Poder Notarial, decides tú, no un juez.
                </h3>
              </div>

              <Button 
                size="lg"
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 min-h-[48px] touch-manipulation"
                onClick={() => navigate("/quiz")}
              >
                <span className="hidden sm:inline">Proteger a Mi Familia Ahora</span>
                <span className="sm:hidden">Proteger Mi Familia</span>
                <Shield className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Column - Left */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                El documento legal que necesitas, sin complicaciones
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Accede al <strong>template que necesitas</strong>, legalmente válido en tu estado
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/20 transition-colors">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                        <p className="text-muted-foreground text-xs">en todos los Estados Unidos</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-destructive/5 rounded-2xl p-6">
                <p className="text-lg mb-4">
                  Por solo <span className="text-3xl font-bold text-destructive">$19.99</span>, 
                  toma el quiz y en 2 minutos sabrás cuáles son las 
                  <strong> cartas de poder exactas y legales</strong> que necesitas para proteger 
                  <strong> todo lo que amas</strong>.
                </p>

                <Button 
                  size="lg"
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg sm:text-xl px-6 sm:px-8 py-4 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto min-h-[48px] touch-manipulation"
                  onClick={() => navigate("/quiz")}
                >
                  Comienza el Quiz ahora
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Image Placeholder Column - Right */}
            <div className="relative">
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/a4b92e2b-dc57-406d-aeec-97ce0580bb34.png" 
                  alt="Documentos de Poder Notarial legales en Estados Unidos" 
                  className="w-full h-[500px] object-cover"
                  loading="lazy" decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprobado por Personas que lo Usan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Miles de familias hispanas que confían en nosotros para proteger 
              sus documentos legales cada día
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Testimonials Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column Testimonials */}
              <div className="space-y-8">
                <Card className="relative bg-background/80 backdrop-blur border shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      "{testimonials[0].text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonialMartha} 
                          alt="Martha R." 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonials[0].author}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[0].location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative bg-background/80 backdrop-blur border shadow-lg lg:ml-8">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      "Después de 3 años viviendo sin documentos, finalmente encontré una solución simple y legal. El proceso fue increíblemente fácil."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonialLuis} 
                          alt="Luis M." 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Luis M.</p>
                        <p className="text-sm text-muted-foreground">Phoenix, AZ</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column Testimonials */}
              <div className="space-y-8">
                <Card className="relative bg-background/80 backdrop-blur border shadow-lg lg:mr-8">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} className="w-4 h-4 text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      "{testimonials[1].text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonialCarlos} 
                          alt="Carlos H." 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonials[1].author}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[1].location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative bg-background/80 backdrop-blur border shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      "Mi familia ahora está protegida. El documento llegó en minutos y las instrucciones estaban súper claras en español."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonialAna} 
                          alt="Ana R." 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Ana R.</p>
                        <p className="text-sm text-muted-foreground">Miami, FL</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-12 text-center">
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>+5,000 familias protegidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>100% documentos legales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span>4.9/5 estrellas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-xl font-bold">¿Esto es legal?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Sí. Todos los documentos están actualizados y cumplen con las leyes del estado correspondiente.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-xl font-bold">¿Reemplaza a un abogado?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    No. Es un recurso válido, útil y económico, pero no sustituye asesoría legal personalizada.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-xl font-bold">¿Incluye notarización?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    No. Debes llevar el documento a notarizar. Estamos trabajando en ofrecer este servicio próximamente.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-xl font-bold">¿Me pueden ayudar a llenarlo?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Sí. Por $59 extra, podemos llenarlo por ti y enviártelo por WhatsApp.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-xl font-bold">¿El proceso es en español?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Sí. Todo está en español, desde el quiz hasta las instrucciones.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Toma el control hoy
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Una sola firma puede hacer la diferencia entre proteger a tu familia 
            o dejar todo en manos del sistema.
          </p>
          
          <Button 
            size="lg"
            variant="secondary"
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate("/quiz")}
          >
            Haz el Quiz y encuentra tu carta de poder ahora
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              <span>Más de 5,000 familias protegidas</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% Legal y válido</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;