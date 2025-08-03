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
  Star,
  TrendingUp,
  Award,
  Smartphone,
  ChevronDown,
  Plus,
  Minus
} from "lucide-react";
import heroFamily from "@/assets/hero-family.jpg";
import legalProtectionIcon from "@/assets/legal-protection-icon.jpg";
import logo from "@/assets/poder-legal-logo.png";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: FileCheck,
      title: "Documentos Inteligentes",
      description: "Cartas de poder personalizadas para tu situación específica",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Análisis en Tiempo Real",
      description: "Evaluación inmediata de tus necesidades legales",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Award,
      title: "Soporte 24/7",
      description: "Asistencia especializada en español cuando la necesites",
      color: "from-green-500 to-blue-600"
    }
  ];

  const stats = [
    { number: "160k+", label: "Documentos", icon: FileText },
    { number: "100k+", label: "Familias Protegidas", icon: Users },
    { number: "99%", label: "Satisfacción", icon: Heart },
    { number: "50", label: "Estados", icon: MapPin }
  ];

  const benefits = [
    "Protege a tus hijos",
    "Acceso a cuentas bancarias", 
    "Venta de propiedades",
    "Decisiones médicas",
    "Representación legal",
    "Seguridad total"
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

  const plans = [
    {
      name: "Documento Básico",
      price: "$19.99",
      description: "Perfecto para empezar",
      features: [
        "Carta de poder personalizada",
        "Instrucciones en español",
        "Válido en todos los estados",
        "Descarga inmediata",
        "Soporte por email"
      ],
      popular: false
    },
    {
      name: "Plan Pro",
      price: "$59.99",
      description: "Perfecto para familias",
      features: [
        "Todo en Plan Básico",
        "Asistencia personalizada por WhatsApp",
        "Revisión de documentos",
        "Notarización guiada",
        "Actualizaciones gratuitas"
      ],
      popular: true
    },
    {
      name: "Plan Familiar",
      price: "$149.99",
      description: "Para protección completa",
      features: [
        "Todo en Plan Pro",
        "Documentos para toda la familia",
        "Consulta legal telefónica",
        "Testamento básico incluido",
        "Soporte prioritario 24/7"
      ],
      popular: false
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logo} 
                alt="Poder Legal USA" 
                className="h-12 w-auto md:h-16"
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
              <a href="#precios" className="text-foreground hover:text-primary transition-colors font-medium">
                Precios
              </a>
              <a href="#preguntas" className="text-foreground hover:text-primary transition-colors font-medium">
                Preguntas
              </a>
              <Button 
                onClick={() => navigate("/quiz")}
                className="bg-black text-white hover:bg-gray-800 rounded-full px-6"
              >
                Empezar Gratis
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
            <div className="md:hidden border-t bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-4 p-4">
                <a href="#servicios" className="text-foreground hover:text-primary transition-colors font-medium">
                  Servicios
                </a>
                <a href="#proceso" className="text-foreground hover:text-primary transition-colors font-medium">
                  Proceso
                </a>
                <a href="#precios" className="text-foreground hover:text-primary transition-colors font-medium">
                  Precios
                </a>
                <a href="#preguntas" className="text-foreground hover:text-primary transition-colors font-medium">
                  Preguntas
                </a>
                <Button 
                  onClick={() => navigate("/quiz")}
                  className="w-full mt-4 bg-black text-white hover:bg-gray-800 rounded-full"
                >
                  Empezar Gratis
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient text-white min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8 mb-16">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                🇺🇸 Legal en todos los estados de USA
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Protege legalmente a tu familia
                <span className="block text-yellow-300">en minutos</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Descarga una <strong>Carta de Poder PDF</strong> válida en tu estado, con instrucciones en español, lista para firmar y notarizar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => navigate("/quiz")}
                  size="xl"
                  className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Empezar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <button className="flex items-center text-white/90 hover:text-white transition-colors">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
                  </div>
                  Ver Demo
                </button>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <img 
                  src={heroFamily} 
                  alt="Familia latina protegida legalmente" 
                  className="rounded-2xl w-full h-auto shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold">Confiado por más de <span className="text-2xl">1000+</span> familias</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-purple">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              Características Poderosas
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Protección Legal para el Negocio Moderno
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Toma control de tu futuro legal con nuestras herramientas avanzadas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isCenter = index === 1;
              return (
                <Card key={index} className={`relative overflow-hidden border-0 ${isCenter ? 'md:scale-110 bg-feature-gradient text-white shadow-purple' : 'bg-white shadow-card'} hover:shadow-card-hover transition-all duration-300`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 ${isCenter ? 'bg-white/20' : 'bg-gradient-to-br from-blue-500 to-purple-600'} rounded-2xl flex items-center justify-center mb-4 shadow-soft`}>
                      <Icon className={`h-8 w-8 ${isCenter ? 'text-white' : 'text-white'}`} />
                    </div>
                    <CardTitle className={`text-xl font-bold ${isCenter ? 'text-white' : 'text-foreground'}`}>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className={`text-base leading-relaxed ${isCenter ? 'text-white/90' : 'text-muted-foreground'}`}>
                      {feature.description}
                    </CardDescription>
                    <Button 
                      variant={isCenter ? "outline" : "ghost"}
                      className={`mt-4 rounded-full ${isCenter ? 'border-white text-white hover:bg-white hover:text-purple-600' : 'text-primary hover:bg-primary/10'}`}
                    >
                      Saber más
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <Badge className="bg-primary/10 text-primary mb-4">
                  CASO DE USO
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  Protección Legal para el Negocio Moderno
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Toma control del futuro financiero de tu empresa con nuestras soluciones. 
                  Toma control del futuro financiero de tu empresa con nuestras soluciones.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={() => navigate("/quiz")}
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3"
              >
                Empezar Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-8 shadow-xl">
                <img 
                  src={legalProtectionIcon} 
                  alt="Protección legal familiar" 
                  className="rounded-2xl w-full h-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              Plan de Precios
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Explora nuestros planes de precios
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Te ayudamos a mantener el control de tus gastos e ingresos. Muestra el flujo de registros
              durante un período específico de tiempo.
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <button className="px-6 py-2 bg-black text-white rounded-full">Mensual</button>
              <button className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full">Anual</button>
              <Badge className="bg-green-100 text-green-700">20% OFF</Badge>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => {
              const isPopular = plan.popular;
              return (
                <Card key={index} className={`relative overflow-hidden border-0 ${isPopular ? 'bg-feature-gradient text-white shadow-purple scale-105' : 'bg-white shadow-card'} hover:shadow-card-hover transition-all duration-300`}>
                  {isPopular && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-white/20 text-white border-white/30">
                        Perfecto para familias
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4 pt-12">
                    <CardTitle className={`text-xl font-bold ${isPopular ? 'text-white' : 'text-foreground'} mb-2`}>
                      {plan.name}
                    </CardTitle>
                    <CardDescription className={`${isPopular ? 'text-white/90' : 'text-muted-foreground'} mb-4`}>
                      {plan.description}
                    </CardDescription>
                    <div className="text-4xl font-bold mb-2">
                      <span className={isPopular ? 'text-white' : 'text-foreground'}>{plan.price}</span>
                    </div>
                    <p className={isPopular ? 'text-white/90' : 'text-muted-foreground'}>Pago único</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Button 
                      variant={isPopular ? "outline" : "default"}
                      className={`w-full rounded-full ${isPopular ? 'border-white text-white hover:bg-white hover:text-purple-600' : 'bg-black text-white hover:bg-gray-800'}`}
                      onClick={() => navigate("/quiz")}
                    >
                      Empezar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="space-y-3">
                      <p className={`font-semibold ${isPopular ? 'text-white' : 'text-foreground'}`}>Incluye</p>
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className={`h-5 w-5 ${isPopular ? 'text-white' : 'text-primary'} flex-shrink-0`} />
                          <span className={`text-sm ${isPopular ? 'text-white/90' : 'text-muted-foreground'}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <p className={`text-sm ${isPopular ? 'text-white/70' : 'text-muted-foreground'}`}>
                      Puedes cancelar fácilmente en cualquier momento
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="preguntas" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Te ayudamos a mantener el control de tus gastos e ingresos. Muestra el flujo de registros
              durante un período específico de tiempo.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="flex justify-between items-center w-full py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-foreground pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <Plus className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">¿Tienes otras preguntas?</h3>
              <p className="text-muted-foreground mb-6">
                Nuestro equipo responderá todas tus preguntas. Aseguramos una respuesta rápida.
              </p>
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8">
                Contáctanos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-card hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Protege a tu familia hoy mismo
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            No esperes a que sea demasiado tarde. Descarga tu carta de poder en minutos.
          </p>
          <Button 
            onClick={() => navigate("/quiz")}
            size="xl"
            className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold"
          >
            Empezar Quiz Gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footer text-footer-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img 
                src={logo} 
                alt="Poder Legal USA" 
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-blue-200 mb-6">
                Protegemos a las familias latinas en Estados Unidos con documentos legales accesibles y confiables.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-blue-200 hover:text-white cursor-pointer" />
                <Twitter className="h-6 w-6 text-blue-200 hover:text-white cursor-pointer" />
                <Instagram className="h-6 w-6 text-blue-200 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Servicios</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Carta de Poder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testamento</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custodia</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Propiedades</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contacto</h4>
              <div className="space-y-3 text-blue-200">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
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
          
          <div className="border-t border-blue-400/20 mt-12 pt-8 text-center text-blue-200">
            <p>&copy; 2024 Poder Legal USA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;