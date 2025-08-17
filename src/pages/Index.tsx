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
  const steps = [{
    number: "1",
    title: "Responde el Quiz Rápido",
    description: "Encuentra la Carta de Poder que necesitas en 2 minutos",
    icon: Phone
  }, {
    number: "2",
    title: "Descarga tu documento PDF",
    description: "A tu teléfono o email en minutos",
    icon: Download
  }, {
    number: "3",
    title: "Recibe instrucciones en español",
    description: "Paso a paso para llenar y firmar con confianza",
    icon: Edit
  }];
  const benefits = [{
    icon: Shield,
    title: "📄 PDF 100% Legal y Válido en tu Estado",
    description: "Cartas de poder listas para firmar y notarizar, aceptadas por instituciones."
  }, {
    icon: Clock,
    title: "⚡ Encuentra la Carta de Poder que Necesitas en Minutos",
    description: "Sin citas, sin esperas y sin pagar cientos de dólares a abogados. Descárgala hoy mismo."
  }, {
    icon: Phone,
    title: "📱 Todo Desde tu Celular, Fácil y Seguro",
    description: "Evita trámites complicados. Obtén tu documento de forma privada y rápida."
  }, {
    icon: Heart,
    title: "🇪🇸 Soporte 100% en Español",
    description: "Si tienes dudas, te guiamos paso a paso para llenarla correctamente."
  }];
  const protections = ["Cuidar a tus hijos", "Acceder a tus cuentas", "Vender tu casa", "Tomar decisiones médicas", "Representarte legalmente en emergencias"];
  const testimonials = [{
    text: "Cuando deportaron a mi esposo, no tenía acceso a nuestras cuentas. Si hubiéramos tenido una carta de poder, todo habría sido diferente.",
    author: "Martha R.",
    location: "Charlotte, NC"
  }, {
    text: "Descargué mi documento en el celular y lo firmé el mismo día con mi esposa. Rápido y claro.",
    author: "Carlos H.",
    location: "Houston, TX"
  }];
  return <div className="min-h-screen bg-background">
      {/* Logo Header */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <img src="/lovable-uploads/1e870570-7e2a-436f-95b4-d50755c085a0.png" alt="Poder LegalUSA.com" className="h-10 md:h-14 lg:h-20 xl:h-24 w-auto" decoding="async" loading="lazy" sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, (max-width: 1280px) 200px, 240px" />
          <a href="https://wa.me/17042645084" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-success hover:bg-success/90 text-success-foreground px-3 md:px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-md">
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
                <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all touch-manipulation w-full sm:w-auto" onClick={() => navigate("/quiz")}>
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
                <img src="/lovable-uploads/45832ed1-efe6-4dba-af5e-9d99059823cb.png" alt="Familia hispana protegida legalmente" className="w-full aspect-[4/3] lg:aspect-[3/2] xl:aspect-[4/3] object-cover" loading="eager" decoding="async" sizes="(min-width: 1024px) 50vw, 100vw" />
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

      {/* Steps Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">✅ Haz tu Power of Attorney sin complicaciones </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">Contesta un quiz en español, fácil y rápido, y descarga el formato legal correcto válido en tu estado. 📄 Viene con instrucciones claras en español, listo para firmar y notarizar. Sin abogados, sin estrés.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => {
            const IconComponent = step.icon;
            return <Card key={index} className="text-center border-2 hover:border-primary/20 transition-all hover:shadow-lg">
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
                </Card>;
          })}
          </div>

          <div className="text-center mt-12 lg:mt-16">
            <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-8 lg:px-10 py-4 lg:py-6 text-base lg:text-lg font-semibold touch-manipulation" onClick={() => navigate("/quiz")}>
              Comenzar ahora
            </Button>
          </div>
        </div>
      </section>

      {/* What is Power of Attorney Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
                ¿Qué es una Carta de Poder?
              </h2>
              
              <p className="text-base lg:text-lg text-muted-foreground mb-6">
                Una <strong>carta de poder</strong> (también llamada poder notarial) es un 
               <strong> documento legal</strong> que te protege si tú no puedes actuar por ti mismo.
              </p>

              <p className="text-base lg:text-lg text-muted-foreground mb-8">
                Este documento le da <strong>acceso y autoridad legal</strong> a una persona 
                de tu confianza para actuar en tu nombre:
              </p>

              <div className="space-y-4 mb-8">
                {protections.map((protection, index) => <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm lg:text-base">{protection}</span>
                  </div>)}
              </div>

              <p className="text-muted-foreground text-sm lg:text-base">
                Ya sea por un viaje, una enfermedad, un accidente o una deportación, 
                tener una carta de poder garantiza que alguien de tu confianza pueda 
                ayudarte sin trabas legales.
              </p>
            </div>

            <div className="relative h-full flex items-center justify-center px-4">
              <img src="/lovable-uploads/eada516d-b5cc-4db8-87be-f593105d8612.png" alt="Aplicación móvil de documentos legales Power of Attorney" className="w-full max-w-sm lg:max-w-md xl:max-w-lg mx-auto h-auto object-contain" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-warning text-warning-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Image Column - Left */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="/lovable-uploads/b5323911-7320-4399-ab20-e69e6e5fa1ac.png" alt="Pareja hispana firmando documentos legales en casa" className="w-full h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-warning/20"></div>
              </div>
            </div>

            {/* Content Column - Right */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
                ¿Te has preguntado qué pasaría si algo te pasa?
              </h2>
              
              <p className="text-base lg:text-lg mb-8 opacity-90">Si sufres una deportación, accidente o enfermedad y no dejaste un Power of Attorney legal, firmado y notarizado para tu estado, tu familia y tus bienes personales podrían quedar completamente desprotegidos.</p>

              <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 lg:p-6 mb-8">
                <h3 className="text-xl lg:text-2xl font-bold mb-2">Sin una Carta de Poder Legal:</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 lg:w-6 lg:h-6 text-destructive mt-1 flex-shrink-0" />
                  <span className="text-sm lg:text-base">No podrá acceder a tus cuentas ni pagar tus gastos</span>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-destructive mt-1 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Nadie podrá acceder a tus cuentas ni pagar tus gastos.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-destructive mt-1 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Nadie podrá tomar decisiones médicas urgentes por ti.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-destructive mt-1 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Tu familia tendrá que gastar miles de dólares y esperar meses en la corte solo para poder acceder a tus bienes.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-destructive mt-1 flex-shrink-0" />
                  <span className="text-sm lg:text-base">Tus hijos menores podrían quedar en manos del sistema.</span>
                </div>
              </div>

              <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-4 lg:py-6 touch-manipulation w-full sm:w-auto" onClick={() => navigate("/quiz")}>
                <span>Proteger a Mi Familia Ahora</span>
                <Shield className="ml-2 w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Content Column - Left */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8">
                Encuentra las Carta de poder que necesitas, sin complicaciones
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground mb-8">
                Accede al <strong>template que necesitas</strong>, legalmente válido en tu estado
              </p>

              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
                {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return <div key={index} className="flex items-start gap-3 lg:gap-4 p-4 lg:p-5 rounded-lg border hover:border-primary/20 transition-colors">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm lg:text-base mb-1 lg:mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground text-xs lg:text-sm">{benefit.description}</p>
                      </div>
                    </div>;
              })}
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-destructive/5 rounded-2xl p-6 lg:p-8">
                <p className="text-base lg:text-lg mb-6">
                  Por solo <span className="text-2xl lg:text-3xl font-bold text-destructive">$19.99</span>, 
                  toma el quiz y en 2 minutos sabrás cuáles son las 
                  <strong> cartas de poder exactas y legales</strong> que necesitas para proteger 
                  <strong> todo lo que amas</strong>.
                </p>

                <Button size="lg" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-base lg:text-lg px-6 lg:px-8 py-4 lg:py-6 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto touch-manipulation" onClick={() => navigate("/quiz")}>
                  Comienza el Quiz ahora
                  <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                </Button>
              </div>
            </div>

            {/* Image Column - Right */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img src="/lovable-uploads/a4b92e2b-dc57-406d-aeec-97ce0580bb34.png" alt="Documentos de Poder Notarial legales en Estados Unidos" className="w-full h-[400px] lg:h-[500px] xl:h-[600px] object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              Confianza de Nuestra Comunidad nos Respalda
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
              Historias reales de familias hispanas que usan nuestras Cartas de Poder para cuidar su futuro.
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column Testimonials */}
              <div className="space-y-6 lg:space-y-8">
                <Card className="relative bg-background/80 backdrop-blur border shadow-lg">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-accent" />)}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm lg:text-base">
                      "Siempre pensé que solo un abogado podía redactar esto y que sería costoso. En pocos minutos tuve mi Carta de Poder lista, 100% legal, y la notaricé aquí en Charlotte sin ningún problema."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={testimonialMartha} alt="Martha R." className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm lg:text-base">{testimonials[0].author}</p>
                        <p className="text-xs lg:text-sm text-muted-foreground">{testimonials[0].location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative bg-background/80 backdrop-blur border shadow-lg lg:ml-8">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-accent" />)}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm lg:text-base">
                      "No confiaba en documentos online, pero después de 3 años sin documentos encontré esta opción. La notaricé en mi banco y la aceptaron sin problema."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={testimonialLuis} alt="Luis M." className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm lg:text-base">Luis M.</p>
                        <p className="text-xs lg:text-sm text-muted-foreground">Phoenix, AZ</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column Testimonials */}
              <div className="space-y-6 lg:space-y-8">
                <Card className="relative bg-background/80 backdrop-blur border shadow-lg lg:mr-8">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-accent" />)}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm lg:text-base">
                      "Descargué mi documento PDF en el celular y ese mismo día lo firmé con mi esposa. Las instrucciones fueron rápidas, claras y fáciles de seguir."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={testimonialCarlos} alt="Carlos H." className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm lg:text-base">{testimonials[1].author}</p>
                        <p className="text-xs lg:text-sm text-muted-foreground">{testimonials[1].location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative bg-background/80 backdrop-blur border shadow-lg">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-accent" />)}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm lg:text-base">
                      "No sabíamos llenarlo porque estaba en inglés. Lo compramos y, con ayuda por WhatsApp, nos lo enviaron listo. Ese mismo día lo firmamos y todo fue rápido y claro."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={testimonialAna} alt="Ana R." className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm lg:text-base">Ana R.</p>
                        <p className="text-xs lg:text-sm text-muted-foreground">Miami, FL</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-12 lg:mt-16 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>+5,000 familias protegidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Documentos 100% legales y válidos en tu estado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  <span>Aceptados por bancos e instituciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg lg:text-xl font-bold">¿Esto es legal?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    Sí. Todos los documentos están actualizados y cumplen con las leyes del estado correspondiente.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg lg:text-xl font-bold">¿Reemplaza a un abogado?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    No. Es un recurso válido, útil y económico, pero no sustituye asesoría legal personalizada.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg lg:text-xl font-bold">¿Incluye notarización?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    No. Debes llevar el documento a notarizar. Estamos trabajando en ofrecer este servicio próximamente.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg lg:text-xl font-bold">¿Me pueden ayudar a llenarlo?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    Sí. Por $59 extra, podemos llenarlo por ti y enviártelo por WhatsApp.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border rounded-lg">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="text-lg lg:text-xl font-bold">¿El proceso es en español?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    Sí. Todo está en español, desde el quiz hasta las instrucciones.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-warning text-warning-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            Toma el control hoy
          </h2>
          <p className="text-base lg:text-xl mb-8 lg:mb-10 opacity-90 max-w-3xl mx-auto">
            Una sola firma puede hacer la diferencia entre proteger a tu familia 
            o dejar todo en manos del sistema.
          </p>
          
          <Button size="lg" variant="secondary" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto touch-manipulation" onClick={() => navigate("/quiz")}>
            <span className="text-center leading-tight">Comienza el Quiz Ahora</span>
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
          </Button>

          <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm opacity-80">
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
    </div>;
};
export default Index;