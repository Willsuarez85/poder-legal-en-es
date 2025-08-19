import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 All rights reserved ©
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Síguenos en redes sociales:</span>
              <div className="flex items-center space-x-3">
                <a 
                  href="https://www.instagram.com/poderlegalusa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Síguenos en Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/poderlegalusa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Síguenos en Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <Link 
              to="/terms-and-conditions" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;