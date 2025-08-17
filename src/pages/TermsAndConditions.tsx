import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">Poder Legal USA</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="text-sm"
          >
            Volver al Inicio
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Terms and Conditions
            </h1>
            <p className="text-muted-foreground">
              Last updated: August 2025
            </p>
          </div>

          <div className="prose max-w-none space-y-8">
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                1. Introduction and Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Poder Legal USA. These Terms and Conditions ("Terms") govern your use of our website, products, and services, including legal templates, forms, and educational guides (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and by our Privacy Policy, which is incorporated herein by reference.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                2. Modifications to the Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or update these Terms at any time. Updates will be posted on this page with a revised date. Continued use of our Services after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                3. Nature of Services
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Poder Legal USA provides self-help legal resources including templates, forms, and educational materials. We are not a law firm, do not provide legal advice, and no attorney-client relationship is created by your use of our Services. Our content is for informational and educational purposes only.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                4. User Responsibilities and Acceptable Use
              </h2>
              <p className="text-muted-foreground leading-relaxed">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use our Services for unlawful purposes;</li>
                <li>Reproduce, resell, or distribute our templates or guides without authorization;</li>
                <li>Provide false or misleading information when using our Services;</li>
                <li>Attempt to interfere with or disrupt our website or payment systems.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                5. Purchases and Payments
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer paid digital products through secure payment processing provided by Stripe. By making a purchase, you agree to provide accurate payment details. All purchases are final and non-refundable unless otherwise required by applicable law.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                6. Account Registration (if applicable)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If account creation is required for certain Services, you are responsible for maintaining the confidentiality of your login information and for all activities under your account.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                7. Intellectual Property Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All templates, guides, and content provided by Poder Legal USA are protected by copyright and intellectual property laws. Unauthorized reproduction, resale, or distribution is strictly prohibited.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                8. Data Collection, Cookies, and Tracking
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect personal information including your name, email, phone number, and state for marketing and transactional purposes. We use Meta Pixel, Google Ads, and Google Analytics for marketing and advertising campaigns. By using our Services, you consent to such data collection and tracking in accordance with our Privacy Policy.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                9. Marketing Communications (Email and SMS)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By providing your contact information, you consent to receive marketing communications via email and SMS. We comply with CAN-SPAM and A2P 10DLC regulations. You may opt-out at any time by following the instructions in our messages (e.g., clicking "unsubscribe" in emails or replying STOP to SMS messages).
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                10. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, Poder Legal USA shall not be liable for any damages, losses, or legal consequences arising from the use of our templates, guides, or Services. The user assumes full responsibility for ensuring compliance with applicable laws in their jurisdiction.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                11. Disclaimer of Warranties
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Services are provided "as is" and "as available." We do not warrant that our templates, guides, or Services will meet your legal needs, be error-free, or guarantee any particular outcome. Certain documents may require notarization or witnesses to be legally valid.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                12. Governing Law and Jurisdiction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed under the laws of the State of Florida, USA, without regard to conflict of law principles. Any disputes shall be resolved exclusively in the courts located in Miami-Dade County, Florida.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                13. Contact Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these Terms, you may contact us at:
              </p>
              <div className="pl-4 space-y-1 text-muted-foreground">
                <p>Email: soporte@poderlegalusa.com</p>
                <p>Phone: 305-363-1170</p>
              </div>
            </section>

            {/* Disclaimer Section */}
            <section className="border-t border-border pt-8 mt-12">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Disclaimer / Legal Notice
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This document does not substitute legal advice. The user is solely responsible for verifying legal compliance in their state and ensuring that any document meets all applicable requirements. The accuracy and completeness of any personal information entered in these forms and documents is the sole responsibility of the user.
                </p>
                <p>
                  These templates and guides are provided for personal use only. Unauthorized reproduction, resale, or distribution is strictly prohibited. We assume no liability for any loss, damage, or legal consequences resulting from the use of these resources.
                </p>
                <p>
                  The purchase or use of these templates does not create an attorney–client relationship. Certain documents may require notarization or witnesses to be legally valid. It is the user's full responsibility to complete these steps in accordance with their jurisdiction's laws.
                </p>
                <p className="font-medium">
                  By using our Services, you acknowledge and agree to this Disclaimer.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;