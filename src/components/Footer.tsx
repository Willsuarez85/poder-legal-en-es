import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, Clock, Shield, CreditCard, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              PODER LEGAL USA
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              Tu protección legal en español
            </p>
            <p className="text-gray-400 text-sm">
              Documentos legales para la comunidad hispana en Estados Unidos.
            </p>
            <div className="mt-4 flex items-center gap-2 text-green-400">
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
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Comenzar Quiz
                </button>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/15558286861" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Contacto WhatsApp
                </a>
              </li>
              <li>
                <Link 
                  to="/terms-and-conditions" 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Soporte</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://wa.me/15558286861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-green-400" />
                  WhatsApp: +1 555 828 6861
                </a>
              </li>
              <li>
                <a 
                  href="mailto:soporte@poderlegalusa.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  soporte@poderlegalusa.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Lun-Vie 9am-6pm EST</span>
              </li>
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Síguenos</h4>
            <div className="flex items-center gap-4 mb-6">
              <a 
                href="https://www.instagram.com/poderlegalusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/poderlegalusa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            
            <h4 className="text-lg font-semibold mb-3 text-white">Pagos Seguros</h4>
            <div className="flex items-center gap-2">
              <div className="bg-white rounded px-2 py-1">
                <CreditCard className="w-6 h-4 text-gray-800" />
              </div>
              <span className="text-xs text-gray-400">Visa</span>
              <span className="text-xs text-gray-400">Mastercard</span>
              <span className="text-xs text-gray-400">Stripe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-sm text-gray-400">
            © 2025 Poder Legal USA - Documentos legales para la comunidad hispana
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;