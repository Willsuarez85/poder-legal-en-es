import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileCheck, 
  Users, 
  Shield, 
  Heart,
  Building,
  Banknote,
  Stethoscope,
  Scale,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
  Download,
  Edit,
  Clock,
  Lock,
  FileText,
  Quote,
  Star
} from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";
import legalProtectionIcon from "@/assets/legal-protection-icon.jpg";
import logo from "@/assets/poder-legal-logo.png";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const steps = [
    {
      number: "1",
      title: "Responde el Quiz Rápido",
      description: "Encuentra la Carta de Poder que necesitas en 2 minutos",
      icon: FileCheck,
    },
    {
      number: "2", 
      title: "Descarga tu documento PDF",
      description: "A tu teléfono o email en minutos",
      icon: Download,
    },
    {
      number: "3",
      title: "Recibe instrucciones paso a paso",
      description: "En español para llenar y firmar con confianza",
      icon: CheckCircle,
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: "Protege a tus hijos",
      description: "Asegura que alguien de confianza pueda cuidar de ellos si algo te pasa"
    },
    {
      icon: Banknote,
      title: "Acceso a cuentas",
      description: "Permite que tu familia acceda a tus cuentas bancarias en emergencias"
    },
    {
      icon: Building,
      title: "Vende tu casa",
      description: "Autoriza la venta de propiedades cuando no puedas hacerlo tú mismo"
    },
    {
      icon: Stethoscope,
      title: "Decisiones médicas",
      description: "Permite que tomen decisiones médicas importantes por ti"
    },
    {
      icon: Scale,
      title: "Representación legal",
      description: "Te representan legalmente en emergencias sin trabas burocráticas"
    },
    {
      icon: Shield,
      title: "Seguridad total",
      description: "Protección legal completa para tu familia y bienes"
    }
  ];

  const protections = [
    "Deportación inesperada",
    "Accidente o enfermedad",
    "Viaje de emergencia",
    "Incapacidad temporal",
    "Hospitalización",
    "Problemas legales"
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
    },
    {
      text: "El proceso fue súper fácil y en español. Ahora tengo la tranquilidad de que mi familia está protegida.",
      author: "Ana M.",
      location: "Phoenix, AZ"
    }
  ];

  const features = [
    {
      title: "Cartas de poder para proteger a tus hijos, pareja, cuentas bancarias, propiedades, negocio, salud y más",
      included: true
    },
    {
      title: "Documentos legales válidos en todos los estados de USA",
      included: true
    },
    {
      title: "Instrucciones claras, paso a paso, en español para llenar y notarizar sin errores",
      included: true
    },
    {
      title: "Opción de asistencia personalizada para el llenado por WhatsApp",
      included: true,
      note: "desde $59"
    }
  ];

  const faqs = [
    {
      question: "¿Esto es legal?",
      answer: "Sí. Todos los documentos están actualizados y cumplen con las leyes del estado correspondiente."
    },
    {
      question: "¿Reemplaza a un abogado?",
      answer: "No. Es un recurso válido, útil y económico, pero no sustituye asesoría legal personalizada."
    },
    {
      question: "¿Incluye notarización?",
      answer: "No. Debes llevar el documento a notarizar. Estamos trabajando en ofrecer este servicio próximamente."
    },
    {
      question: "¿Me pueden ayudar a llenarlo?",
      answer: "Sí. Por $59 extra, podemos llenarlo por ti y enviártelo por WhatsApp."
    },
    {
      question: "¿El proceso es en español?",
      answer: "Sí. Todo está en español, desde el quiz hasta las instrucciones."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logo} 
                alt="Poder Legal USA" 
                className="h-16 w-auto md:h-20"
              />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#servicios" className="text-foreground hover:text-primary transition-colors font-medium">
                Servicios
              </a>
              <a href="#proceso" className="text-foreground hover:text-primary transition-colors font-medium">
                Proceso
              </a>
              <a href="#testimonios" className="text-foreground hover:text-primary transition-colors font-medium">
                Testimonios
              </a>
              <a href="#preguntas" className="text-foreground hover:text-primary transition-colors font-medium">
                Preguntas
              </a>
              <Button 
                onClick={() => navigate("/quiz")}
                size="sm"
                className="ml-4"
              >
                Empezar Quiz
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-4 p-4">
                <a href="#servicios" className="text-foreground hover:text-primary transition-colors font-medium">
                  Servicios
                </a>
                <a href="#proceso" className="text-foreground hover:text-primary transition-colors font-medium">
                  Proceso
                </a>
                <a href="#testimonios" className="text-foreground hover:text-primary transition-colors font-medium">
                  Testimonios
                </a>
                <a href="#preguntas" className="text-foreground hover:text-primary transition-colors font-medium">
                  Preguntas
                </a>
                <Button 
                  onClick={() => navigate("/quiz")}
                  size="sm"
                  className="w-full mt-4"
                >
                  Empezar Quiz
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  🇺🇸 Legal en todos los estados de USA
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  Protege legalmente a tu familia, tu negocio y tus bienes en Estados Unidos
                  <span className="text-yellow-300"> en minutos</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                  Descarga una <strong>Carta de Poder PDF</strong> válida en tu estado, con instrucciones en español, lista para firmar y notarizar.
                </p>
                <p className="text-lg text-blue-200">
                  Sin abogados caros, ni trámites confusos. Todo en tu celular.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/quiz")}
                  size="xl"
                  className="w-full sm:w-auto font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Encuentra la Carta que necesitas en 2 minutos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 text-blue-100">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Solo $19.99 • Descarga inmediata • Instrucciones en español</span>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroFamily} 
                alt="Familia latina protegida legalmente" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="proceso" className="py-16 md:py-24 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Protege lo que amas en 3 pasos:
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un proceso simple y rápido diseñado para que puedas proteger a tu familia sin complicaciones
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="relative overflow-hidden group hover:shadow-card-hover transition-all duration-300 border-0 shadow-card">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold">{step.number}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground text-base leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What is Power of Attorney */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                ¿Qué es una Carta de Poder?
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Una <strong>carta de poder</strong> (también llamada poder notarial) es un <strong>documento legal</strong> que te protege si tú no puedes actuar por ti mismo.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Este documento le da <strong>acceso y autoridad legal</strong> a una persona de tu confianza para actuar en tu nombre:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-section-light">
                        <Icon className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ya sea por un viaje, una enfermedad, un accidente o una deportación, tener una carta de poder garantiza que alguien de tu confianza pueda ayudarte sin trabas legales.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={legalProtectionIcon} 
                alt="Protección legal familiar" 
                className="rounded-2xl shadow-xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-destructive">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <AlertTriangle className="h-16 w-16 text-destructive" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              ¿Te has preguntado qué pasaría si algo te pasa?
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <p className="text-xl text-foreground mb-6 font-semibold">
                Si sufres una deportación, accidente o enfermedad, tu familia:
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <X className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">No podrá acceder a tus cuentas ni pagar tus gastos</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <X className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">No podrá tomar decisiones médicas urgentes</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <X className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">No podrá cuidar legalmente de tus hijos</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <X className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Tendrá que gastar miles de dólares y esperar meses en la corte</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <X className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Sin acceso a propiedades o bienes importantes</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <X className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Imposibilidad de manejar asuntos legales urgentes</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-section-accent rounded-xl">
                <p className="text-lg font-bold text-primary">
                  Con un Poder Notarial, decides tú, no un juez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-16 md:py-24 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                El documento legal que necesitas, sin complicaciones
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Accede al <strong>template que necesitas</strong>, legalmente válido en tu estado, con:
              </p>
            </div>
            
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-lg text-foreground leading-relaxed">
                          {feature.title}
                        </p>
                        {feature.note && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {feature.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-hero-gradient text-white rounded-xl text-center">
                  <p className="text-2xl font-bold mb-2">
                    Por solo $19.99
                  </p>
                  <p className="text-lg mb-6">
                    Toma el quiz y en 2 minutos sabrás cuáles son las <strong>cartas de poder exactas y legales</strong> que necesitas para proteger <strong>todo lo que amas</strong>.
                  </p>
                  <Button 
                    onClick={() => navigate("/quiz")}
                    size="lg"
                    className="font-bold"
                  >
                    Comienza el Quiz ahora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                ¿Esto es legal?
              </h2>
            </div>
            
            <Card className="shadow-xl border-0">
              <CardContent className="p-8 space-y-6">
                <p className="text-xl font-bold text-primary text-center">
                  Sí. Las cartas de poder que ofrecemos son legales y válidas en todo Estados Unidos.
                </p>
                
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>No necesitas pagar abogados caros ni pasar por procesos complicados.</p>
                  
                  <p className="font-semibold text-foreground">Lo que realmente necesitas es:</p>
                  
                  <div className="space-y-3 ml-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <span>El <strong>template correcto</strong>, adaptado a las leyes de tu estado</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <span>Una <strong>guía clara y en español</strong> para llenarlo correctamente</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <span>Llevarlo a notarizar, como exige la ley en la mayoría de los estados</span>
                    </div>
                  </div>
                  
                  <p>Con eso es suficiente para protegerte legalmente.</p>
                  
                  <div className="bg-section-accent p-6 rounded-xl">
                    <p><strong>Nuestros documentos están organizados y verificados por estado.</strong></p>
                    <p className="mt-2">No reemplazan asesoría legal personalizada, pero sí te permiten actuar con confianza y tomar el control hoy mismo, sin gastar cientos o miles de dólares.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonios" className="py-16 md:py-24 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Testimonios
            </h2>
            <p className="text-xl text-muted-foreground">
              Lo que dicen nuestros clientes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300 border-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Quote className="h-8 w-8 text-primary/30" />
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              ¿Quiénes Somos?
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Poder Legal USA es una iniciativa comunitaria que ayuda a las familias latinas a obtener <strong>documentos legales válidos y simples</strong>, sin necesidad de websites y trámites confusos.
              </p>
              <p>
                Organizamos una base de datos con <strong>cartas de poder por estado</strong>, actualizadas y fáciles de usar.
              </p>
              <p className="text-primary font-semibold">
                No damos asesoría legal. Si tienes dudas específicas, recomendamos acudir a un abogado. Nosotros te ayudamos a <strong>dar el primer paso legal sin complicaciones</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="preguntas" className="py-16 md:py-24 bg-section-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Preguntas Frecuentes
              </h2>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="shadow-card border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-hero-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Toma el control hoy
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Una sola firma puede hacer la diferencia entre proteger a tu familia o dejar todo en manos del sistema.
            </p>
            <Button 
              onClick={() => navigate("/quiz")}
              size="xl"
              className="font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Haz el Quiz y encuentra tu carta de poder ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center justify-center space-x-4 text-blue-100">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Proceso 100% en español • Descarga inmediata • $19.99</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footer text-footer-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img 
                src={logo} 
                alt="Poder Legal USA" 
                className="h-12 w-auto brightness-0 invert"
              />
              <p className="text-sm text-blue-200 leading-relaxed">
                Protegiendo a las familias latinas con documentos legales simples y válidos en todos los estados de USA.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Cartas de Poder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Protección Familiar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentos por Estado</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Asistencia en Español</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li><a href="#preguntas" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contacto</h4>
              <div className="space-y-3 text-sm text-blue-200">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@poderlegalusa.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Estados Unidos</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-700 mt-12 pt-8 text-center text-sm text-blue-200">
            <p>&copy; 2024 Poder Legal USA. Todos los derechos reservados.</p>
            <p className="mt-2">
              Este sitio no proporciona asesoría legal. Los documentos están diseñados para uso general y no sustituyen el consejo de un abogado.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;