import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import heroImage from "@/assets/hero-family.jpg";
import legalProtectionIcon from "@/assets/legal-protection-icon.jpg";
import threeStepsImage from "@/assets/three-steps.jpg";

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
      title: "Protección Legal Inmediata",
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
            className="h-18 md:h-24 w-auto"
          />
          <Badge variant="secondary" className="text-sm font-medium flex items-center gap-2">
            <span className="text-2xl">🇺🇸</span>
            <span>Válido en todos los Estados Unidos</span>
            <div className="flex">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-muted/30 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Protege legalmente a tu familia, tu negocio y tus bienes en 
                <span className="text-primary"> Estados Unidos</span> en minutos
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Descarga una <strong>Carta de Poder PDF</strong> válida en tu estado, 
                con instrucciones en español, lista para firmar y notarizar.
              </p>
              
              <p className="text-base text-muted-foreground">
                Sin abogados caros, ni trámites confusos. Todo en tu celular.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg px-8 py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => navigate("/quiz")}
                >
                  Encuentra la Carta que necesitas en 2 minutos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>100% Legal</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>En Español</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Descarga Inmediata</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Familia hispana protegida legalmente" 
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                <div className="flex items-center gap-2">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-bold text-lg">5,000+</div>
                    <div className="text-sm text-muted-foreground">Familias Protegidas</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-destructive text-destructive-foreground rounded-lg shadow-lg p-4 hidden md:block">
                <div className="text-center">
                  <div className="font-bold text-lg">100% Legal</div>
                  <div className="text-sm opacity-90">Garantizado</div>
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
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive"
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
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
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

            <div className="relative">
              <img 
                src={legalProtectionIcon} 
                alt="Protección legal documentos" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-800">
              ¿Te has preguntado qué pasaría si algo te pasa?
            </h2>
            
            <p className="text-lg text-red-700 mb-8">
              Si sufres una deportación, accidente o enfermedad, tu familia:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white/80 border-red-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-red-700">No podrá acceder a tus cuentas ni pagar tus gastos</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-red-700">No podrá tomar decisiones médicas urgentes</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-red-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-red-700">No podrá cuidar legalmente de tus hijos</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <span className="text-red-700">Tendrá que gastar miles de dólares y esperar meses en la corte</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-green-100 border border-green-300 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Con un Poder Notarial, decides tú, no un juez.
              </h3>
            </div>

            <Button 
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg px-8 py-6"
              onClick={() => navigate("/quiz")}
            >
              Proteger a Mi Familia Ahora
              <Shield className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              El documento legal que necesitas, sin complicaciones
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Accede al <strong>template que necesitas</strong>, legalmente válido en tu estado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-destructive/5 rounded-2xl p-8 text-center">
            <p className="text-lg mb-4">
              Por solo <span className="text-3xl font-bold text-destructive">$19.99</span>, 
              toma el quiz y en 2 minutos sabrás cuáles son las 
              <strong> cartas de poder exactas y legales</strong> que necesitas para proteger 
              <strong> todo lo que amas</strong>.
            </p>

            <Button 
              size="lg"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xl px-12 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/quiz")}
            >
              Comienza el Quiz ahora
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-muted-foreground italic mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
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