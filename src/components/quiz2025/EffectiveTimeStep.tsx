import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

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
    description: 'El poder notarial entra en efecto desde el momento de la firma',
    icon: '⚡',
    color: 'blue'
  },
  {
    value: 'specific_circumstance',
    label: 'En circunstancias específicas',
    description: 'El poder se activa solo cuando ocurre algo específico (ej: incapacidad, deportación)',
    icon: '⏳',
    color: 'purple'
  }
];

export const EffectiveTimeStep = ({ selectedTime, onTimeSelect, onNext, onPrev }: EffectiveTimeStepProps) => {
  const [touched, setTouched] = useState(false);

  const handleTimeSelect = (value: string) => {
    onTimeSelect(value);
    setTouched(true);
  };

  const handleNext = () => {
    if (selectedTime) {
      onNext();
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between p-4 max-w-md mx-auto w-full">
      {/* Tip Box - Estilo moderno */}
      <div className="mb-6 animate-fadeIn">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-amber-400 rounded-full p-3 shadow-md">
              <AlertCircle className="w-6 h-6 text-gray-800" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Importante saber</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Un Poder Notarial puede activarse inmediatamente o solo cuando 
                ocurra algo específico (como una emergencia médica o deportación). 
                Esta decisión es clave para proteger tus intereses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <Card className="border-0 shadow-xl bg-white rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¿Cuándo quieres que entre en efecto?
            </h2>
            <p className="text-gray-600 text-sm">
              Elige cuándo la persona podrá actuar en tu nombre
            </p>
          </div>

          <div className="space-y-4">
            {TIME_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleTimeSelect(option.value)}
                className={`w-full p-5 rounded-2xl border-2 transition-all transform hover:scale-[1.02] ${
                  selectedTime === option.value
                    ? option.color === 'blue' 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-4 text-left">
                  <span className="text-2xl">{option.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {option.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                  {selectedTime === option.value && (
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      option.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}>
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}

            {touched && selectedTime && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 animate-slideUp">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Excelente elección para tu situación
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 space-y-4">
        <div className="flex gap-3">
          <Button
            onClick={onPrev}
            variant="outline"
            className="flex-1 h-14 font-semibold text-base rounded-2xl border-2"
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            <span>Anterior</span>
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedTime}
            className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
          >
            <span>Continuar</span>
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        
        <p className="text-center text-xs text-gray-500">
          Paso 2 de 4 • Tiempo de Efectividad
        </p>
      </div>
    </div>
  );
};