import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question_text: any;
  question_type: string;
  options?: any;
  order_number: number;
  is_required?: boolean;
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [sessionId] = useState(() => crypto.randomUUID());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("id, question_text, question_type, options, order_number")
        .order("order_number");

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las preguntas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = answers[currentQuestion.id];

    if (currentQuestion.is_required !== false && !answer) {
      toast({
        title: "Respuesta requerida",
        description: "Por favor responde esta pregunta antes de continuar",
        variant: "destructive",
      });
      return;
    }

    await saveAnswer(currentQuestion.id, answer);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      navigate("/results", { state: { sessionId } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const renderQuestionInput = (question: Question) => {
    const questionText = typeof question.question_text === 'object' 
      ? question.question_text.es || question.question_text.en || "Pregunta"
      : question.question_text;

    switch (question.question_type) {
      case "multiple_choice":
        const options = question.options?.es || question.options?.options || [];
        return (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {options.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="text-sm font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "dropdown":
        const dropdownOptions = question.options?.es || question.options?.options || [];
        return (
          <Select value={answers[question.id] || ""} onValueChange={handleAnswer}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {dropdownOptions.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "text":
        return (
          <Textarea
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            className="w-full"
          />
        );

      default:
        return (
          <Input
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Tu respuesta"
            className="w-full"
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando cuestionario...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <p className="text-muted-foreground">No hay preguntas disponibles en este momento.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const questionText = typeof currentQuestion.question_text === 'object' 
    ? currentQuestion.question_text.es || currentQuestion.question_text.en || "Pregunta"
    : currentQuestion.question_text;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Cuestionario Legal</h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} de {questions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              {questionText}
              {currentQuestion.is_required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderQuestionInput(currentQuestion)}
            
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Anterior
              </Button>
              <Button onClick={handleNext}>
                {currentQuestionIndex === questions.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;