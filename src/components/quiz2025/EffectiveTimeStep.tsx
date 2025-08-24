import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TipBox } from "./TipBox";

interface EffectiveTimeStepProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const TIME_OPTIONS = [
  {
    value: 'immediate',
    label: 'Inmediatamente',
    emoji: '✅',
    description: 'El poder entra en efecto desde el momento de la firma'
  },
  {
    value: 'specific_circumstance',
    label: 'Cuando ocurra una circunstancia específica',
    emoji: '⏳',
    description: 'El poder se activa solo en circunstancias específicas. Ejemplo: en caso de fallecimiento o deportación.'
  }
];

export const EffectiveTimeStep = ({ selectedTime, onTimeSelect, onNext, onPrev }: EffectiveTimeStepProps) => {
  const handleNext = () => {
    if (selectedTime) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            ¿Desde cuándo quieres que la persona pueda actuar por ti?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {TIME_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onTimeSelect(option.value)}
                className={`p-6 border rounded-lg text-left transition-colors ${
                  selectedTime === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">{option.emoji}</span>
                  <div>
                    <div className="font-semibold text-lg">{option.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onPrev}>
              ⬅️ Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedTime}
              className="px-8"
              style={{ backgroundColor: '#de1f27' }}
            >
              Continuar ➡️
            </Button>
          </div>
        </CardContent>
      </Card>

      <TipBox>
        Puedes darle poder a alguien solo en caso de que algo te pase, una enfermedad que te incapacite, deportación o desde el momento de la firma.
      </TipBox>
    </div>
  );
};