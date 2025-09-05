import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          onClick={() => navigate("/")} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Use</h1>
        
        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using PoderLegalUSA.com ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. No Legal Advice</h2>
            <p className="text-gray-600 mb-4">
              <strong>IMPORTANT DISCLAIMER:</strong> This Website does not provide legal advice. The documents and services provided are self-help tools and informational materials only. They are not a substitute for the advice of an attorney.
            </p>
            <p className="text-gray-600 mb-4">
              Poder Legal USA is not a law firm and is not licensed to practice law. We cannot represent you in court, advise you about your legal rights or the law, or select legal forms for you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              It is the sole responsibility of the user to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Read and understand all documents before signing</li>
              <li>Ensure documents are filled out correctly and completely</li>
              <li>Have documents properly notarized according to state laws</li>
              <li>Verify that documents meet the legal requirements of their state</li>
              <li>Consult with a licensed attorney for specific legal situations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Document Templates</h2>
            <p className="text-gray-600 mb-4">
              The documents provided are templates only. While they are designed to comply with general legal requirements, laws vary by state and circumstances. Users must ensure that the documents meet their specific needs and comply with their state's laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Poder Legal USA shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Your use or inability to use the Website or documents</li>
              <li>Any errors or omissions in the documents</li>
              <li>Any legal consequences arising from the use of the documents</li>
              <li>Any unauthorized access to or alteration of your transmissions or data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Refund Policy</h2>
            <p className="text-gray-600 mb-4">
              We offer a 30-day satisfaction guarantee. If you are not satisfied with your purchase, you may request a full refund within 30 days of purchase. Refunds will be processed within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Privacy</h2>
            <p className="text-gray-600 mb-4">
              Your use of our Website is also governed by our Privacy Policy. We are committed to protecting your personal information and use it only to provide our services to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content on this Website, including documents, text, graphics, logos, and software, is the property of Poder Legal USA and is protected by copyright laws. You may use the documents for your personal use only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Modifications to Terms</h2>
            <p className="text-gray-600 mb-4">
              Poder Legal USA reserves the right to modify these terms at any time. We will notify users of any changes by posting the new Terms of Use on this page. Continued use of the Website after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p className="text-gray-600 mb-4">
              These Terms of Use shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                <strong>Poder Legal USA</strong><br/>
                Email: soporte@poderlegalusa.com<br/>
                WhatsApp: +1 555 828 6861<br/>
                Hours: Monday-Friday, 9am-6pm EST
              </p>
            </div>
          </section>

          <section className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-500">
              Last Updated: January 2025
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;