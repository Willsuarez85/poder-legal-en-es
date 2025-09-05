import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, Clock, Shield, CreditCard, Home, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-primary text-white">
      {/* Legal Notice */}
      <div className="bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-3 text-sm text-white/90">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Aviso Legal:</strong> Este sitio no proporciona asesoría legal. Los documentos son plantillas autollenables. 
              Es responsabilidad del usuario leer, llenar correctamente y notarizar los documentos según las leyes de su estado. 
              Consulte con un abogado para situaciones legales específicas.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              PODER LEGAL USA
            </h3>
            <p className="text-white/80 mb-4 text-sm">
              Tu protección legal en español
            </p>
            <p className="text-white/80 text-sm">
              Documentos legales para la comunidad hispana en Estados Unidos.
            </p>
            <div className="mt-4 flex items-center gap-2 text-yellow-300">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-semibold">Más de 1,000 familias protegidas</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate("/quiz-2025")}
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Comenzar Quiz
                </button>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/15558286861" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Contacto WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terms-of-use" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link 
                  to="/legal-notice" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-and-conditions" 
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Soporte</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a 
                  href="https://wa.me/15558286861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-green-400" />
                  WhatsApp: +1 555 828 6861
                </a>
              </li>
              <li>
                <a 
                  href="mailto:soporte@poderlegalusa.com"
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-300" />
                  soporte@poderlegalusa.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <Clock className="w-4 h-4 text-yellow-300" />
                <span>Lun-Vie 9am-6pm EST</span>
              </li>
            </ul>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/poderlegalusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/poderlegalusa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-sm text-white/90">
              © 2025 Poder Legal USA - Documentos legales para la comunidad hispana
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-white/70">
              <CreditCard className="w-4 h-4" />
              <span>Pagos seguros con Stripe • Visa • Mastercard</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;