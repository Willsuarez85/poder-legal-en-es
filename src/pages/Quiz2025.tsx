import { useState, useEffect } from "react";
import { StateSelectionStep } from "@/components/quiz2025/StateSelectionStep";
import { EffectiveTimeStep } from "@/components/quiz2025/EffectiveTimeStep";
import { ProductSelectionStep } from "@/components/quiz2025/ProductSelectionStep";
import { CheckoutStep } from "@/components/quiz2025/CheckoutStep";
import { Quiz2025Navbar } from "@/components/quiz2025/Quiz2025Navbar";
import { ProgressBar } from "@/components/quiz2025/ProgressBar";
import { GTM } from "@/lib/gtm";

export type QuizAnswers = {
  state: string;
  effective_time: string;
  selected_products: string[];
  grantor_id?: string;
  grantee_id?: string;
};

const Quiz2025 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    state: "",
    effective_time: "",
    selected_products: [],
  });

  // Track page view on component mount
  useEffect(() => {
    GTM.trackPageView('/quiz-2025');
  }, []);

  const updateAnswers = (newAnswers: Partial<QuizAnswers>) => {
    setAnswers(prev => ({ ...prev, ...newAnswers }));
    // Save to localStorage
    localStorage.setItem('quiz2025_answers', JSON.stringify({ ...answers, ...newAnswers }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StateSelectionStep
            selectedState={answers.state}
            onStateSelect={(state) => updateAnswers({ state })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <EffectiveTimeStep
            selectedTime={answers.effective_time}
            onTimeSelect={(effective_time) => updateAnswers({ effective_time })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <ProductSelectionStep
            selectedState={answers.state}
            selectedProducts={answers.selected_products}
            onProductsSelect={(selected_products) => updateAnswers({ selected_products })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <CheckoutStep
            answers={answers}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Quiz2025Navbar />
      <ProgressBar currentStep={currentStep} totalSteps={4} />
      <div className="container mx-auto px-4 py-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default Quiz2025;