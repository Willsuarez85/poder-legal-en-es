import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WelcomeScreen } from "@/components/quiz/WelcomeScreen";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ContactDataScreen } from "@/components/quiz/ContactDataScreen";

const US_STATES = [
  { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" }, { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" }, { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" }, { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" }, { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" }, { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" }, { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" }, { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" }, { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" }, { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" }, { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" }, { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" }, { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" }, { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" }, { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" }, { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" }, { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" }
];

const QUIZ_QUESTIONS = [
  {
    id: "state",
    emoji: "🗺️",
    title: "¿En qué estado de USA necesitas usar el documento?",
    subtitle: "Es importante porque las leyes cambian de estado a estado",
    type: "dropdown" as const,
    options: US_STATES.map(state => ({ value: state.value, label: state.label, icon: "🏛️" })),
    tooltip: "Cada estado tiene leyes diferentes para los documentos legales. Es crucial seleccionar el correcto."
  },
  {
    id: "protection",
    emoji: "🛡️",
    title: "¿Qué necesitas proteger si tú no pudieras actuar?",
    subtitle: "Puedes seleccionar más de una opción",
    type: "multiple" as const,
    options: [
      { value: "property", label: "Mi casa o propiedades", icon: "🏠" },
      { value: "business", label: "Mi negocio o cuentas bancarias", icon: "💼" },
      { value: "medical", label: "Mis decisiones médicas", icon: "⚕️" },
      { value: "children", label: "El cuidado legal de mis hijos", icon: "👶" }
    ],
    tooltip: "Estas son las áreas donde una Carta de Poder puede darte tranquilidad legal. No necesitas saber los términos legales, solo elige lo que quieres proteger."
  },
  {
    id: "authorization_type",
    emoji: "⚖️",
    title: "¿Quieres que tu persona de confianza pueda ayudarte con todo o solo en cosas específicas?",
    type: "single" as const,
    options: [
      { value: "general", label: "Que me ayude en TODO si yo no puedo", icon: "🌟" },
      { value: "specific", label: "Solo en temas específicos (ej: solo salud o finanzas)", icon: "🎯" }
    ],
    tooltip: "Un poder general permite manejar casi todo por ti. Un poder limitado solo cubre lo que tú decides."
  },
  {
    id: "activation",
    emoji: "🕒",
    title: "¿Cuándo debería empezar a usarse esta Carta de Poder?",
    type: "single" as const,
    options: [
      { value: "immediate", label: "Desde el momento en que la firmo", icon: "⚡" },
      { value: "emergency", label: "Solo si hay una emergencia médica y yo no puedo decidir", icon: "🚨" }
    ],
    tooltip: "Algunos poderes se activan de inmediato, otros solo si un médico certifica que no puedes tomar decisiones."
  }
];

const Quiz = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'questions' | 'contact'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [sessionId] = useState(() => crypto.randomUUID());
  const navigate = useNavigate();
  const { toast } = useToast();

  const startQuiz = () => {
    setCurrentScreen('questions');
  };

  const saveAnswer = async (questionId: string, answer: any) => {
    try {
      const { error } = await supabase
        .from("quiz_responses")
        .insert({
          session_id: sessionId,
          question_id: questionId,
          answer: answer
        });

      if (error) throw error;
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  const handleAnswer = (value: any) => {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = async () => {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    const answer = answers[currentQuestion.id];

    if (!answer || (Array.isArray(answer) && answer.length === 0)) {
      toast({
        title: "Respuesta requerida",
        description: "Por favor responde esta pregunta antes de continuar",
        variant: "destructive",
      });
      return;
    }

    await saveAnswer(currentQuestion.id, answer);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('contact');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentScreen('welcome');
    }
  };

  const handleContactComplete = async (contactData: { name: string; phone: string }) => {
    try {
      // Save contact data
      const { error: contactError } = await supabase
        .from("quiz_responses")
        .insert({
          session_id: sessionId,
          question_id: "contact_data",
          answer: contactData
        });

      if (contactError) throw contactError;

      navigate("/results", { state: { sessionId, contactData } });
    } catch (error) {
      console.error("Error saving contact data:", error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los datos",
        variant: "destructive",
      });
    }
  };

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={startQuiz} />;
  }

  if (currentScreen === 'contact') {
    return <ContactDataScreen onComplete={handleContactComplete} />;
  }

  // Questions screen
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  
  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={QUIZ_QUESTIONS.length}
      answer={answers[currentQuestion.id]}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoBack={currentQuestionIndex > 0}
      isLast={currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
    />
  );
};

export default Quiz;