import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface Question {
  id: string;
  emoji: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multiple' | 'dropdown';
  options: Array<{ value: string; label: string; icon?: string }>;
  tooltip?: string;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  answer: any;
  onAnswer: (value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLast: boolean;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  isLast
}: QuestionCardProps) => {
  const progress = (questionNumber / totalQuestions) * 100;

  const handleMultipleSelect = (value: string, checked: boolean) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    if (checked) {
      onAnswer([...currentAnswers, value]);
    } else {
      onAnswer(currentAnswers.filter((item: string) => item !== value));
    }
  };

  const renderOptions = () => {
    switch (question.type) {
      case 'dropdown':
        return (
          <Select value={answer || ""} onValueChange={onAnswer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiple':
        const selectedAnswers = Array.isArray(answer) ? answer : [];
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={option.value}
                  checked={selectedAnswers.includes(option.value)}
                  onCheckedChange={(checked) => handleMultipleSelect(option.value, checked as boolean)}
                />
                <Label htmlFor={option.value} className="flex items-center space-x-2 cursor-pointer flex-1">
                  {option.icon && <span className="text-xl">{option.icon}</span>}
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </div>
        );

      default: // single
        return (
          <RadioGroup value={answer || ""} onValueChange={onAnswer} className="space-y-4">
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex items-center space-x-2 cursor-pointer flex-1">
                  {option.icon && <span className="text-xl">{option.icon}</span>}
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
    }
  };

  const hasAnswer = () => {
    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer && answer.trim();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Cuestionario Legal</h1>
            <span className="text-sm text-muted-foreground">
              {questionNumber} de {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card>
          <CardHeader className="space-y-4">
            <div className="text-center">
              <div className="text-4xl mb-4">{question.emoji}</div>
              <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                {question.title}
                {question.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{question.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </CardTitle>
              {question.subtitle && (
                <p className="text-sm text-muted-foreground mt-2">{question.subtitle}</p>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderOptions()}
            
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={!canGoBack}
              >
                ← Anterior
              </Button>
              <Button 
                onClick={onNext}
                disabled={!hasAnswer()}
              >
                {isLast ? "Finalizar" : "Siguiente →"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};