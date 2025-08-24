import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TipBox } from "./TipBox";
import { QuizAnswers } from "@/pages/Quiz2025";

interface IdentificationStepProps {
  answers: QuizAnswers;
  onAnswersUpdate: (answers: Partial<QuizAnswers>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ID_OPTIONS = [
  { value: 'us_license', label: 'Licencia de EE. UU.', emoji: '🪪' },
  { value: 'us_passport', label: 'Pasaporte de EE. UU.', emoji: '🛂' },
  { value: 'intl_passport', label: 'Pasaporte internacional', emoji: '🌎' },
  { value: 'foreign_license', label: 'Licencia de otro país', emoji: '🪪' },
  { value: 'consular_id', label: 'Matrícula consular', emoji: '🟢' }
];

export const IdentificationStep = ({ answers, onAnswersUpdate, onNext, onPrev }: IdentificationStepProps) => {
  const handleSameIdToggle = (checked: boolean) => {
    const updates: Partial<QuizAnswers> = { same_id: checked };
    if (checked && answers.grantor_id) {
      updates.grantee_id = answers.grantor_id;
    }
    onAnswersUpdate(updates);
  };

  const handleGrantorIdSelect = (id: string) => {
    const updates: Partial<QuizAnswers> = { grantor_id: id };
    if (answers.same_id) {
      updates.grantee_id = id;
    }
    onAnswersUpdate(updates);
  };

  const handleGranteeIdSelect = (id: string) => {
    onAnswersUpdate({ grantee_id: id });
  };

  const canContinue = answers.grantor_id && answers.grantee_id;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            ¿Con qué tipo de documento firmarán?
          </CardTitle>
          <p className="text-muted-foreground">
            Elige el documento del Otorgante y del Apoderado
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2 justify-center">
            <Switch
              id="same-id"
              checked={answers.same_id}
              onCheckedChange={handleSameIdToggle}
            />
            <Label htmlFor="same-id" className="text-sm">
              ☑️ Usamos la misma identificación los dos
            </Label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Otorgante */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Otorgante</CardTitle>
                <p className="text-sm text-muted-foreground">Quien da el poder (tú)</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {ID_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleGrantorIdSelect(option.value)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        answers.grantor_id === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Apoderado */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apoderado</CardTitle>
                <p className="text-sm text-muted-foreground">Persona de confianza que actúa por ti</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {ID_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleGranteeIdSelect(option.value)}
                      disabled={answers.same_id}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        answers.same_id 
                          ? 'opacity-50 cursor-not-allowed' 
                          : answers.grantee_id === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onPrev}>
              ⬅️ Anterior
            </Button>
            <Button
              onClick={onNext}
              disabled={!canContinue}
              className="px-8"
              style={{ backgroundColor: '#de1f27' }}
            >
              Continuar ➡️
            </Button>
          </div>
        </CardContent>
      </Card>

      <TipBox>
        Para firmar un poder válido, puedes usar pasaporte o identificación de tu país, siempre que esté vigente.
      </TipBox>
    </div>
  );
};