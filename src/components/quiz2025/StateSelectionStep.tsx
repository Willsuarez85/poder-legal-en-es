import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Lightbulb, ChevronRight } from "lucide-react";
import { useState } from "react";

interface StateSelectionStepProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  onNext: () => void;
}

export const StateSelectionStep = ({ selectedState, onStateSelect, onNext }: StateSelectionStepProps) => {
  const [touched, setTouched] = useState(false);
  
  const states = [
    { value: 'california', label: 'California' },
    { value: 'florida', label: 'Florida' },
    { value: 'texas', label: 'Texas' }
  ];

  const handleStateSelect = (state: string) => {
    onStateSelect(state);
    setTouched(true);
  };

  const handleNext = () => {
    if (selectedState) {
      onNext();
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between p-4 max-w-md mx-auto w-full">
      {/* Tip Box - Estilo moderno */}
      <div className="mb-6 animate-fadeIn">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-400 rounded-full p-3 shadow-md">
              <Lightbulb className="w-6 h-6 text-gray-800" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">¿Sabías que?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                No todos los poderes notariales son válidos en todos los estados. 
                Cada estado tiene sus propias leyes y requisitos específicos que deben cumplirse 
                para que el documento sea legalmente válido.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <Card className="border-0 shadow-xl bg-white rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¿En qué estado necesitas tu Poder Notarial?
            </h2>
            <p className="text-gray-600 text-sm">
              Selecciona el estado donde se usará el documento
            </p>
          </div>

          <div className="space-y-4">
            <Select value={selectedState} onValueChange={handleStateSelect}>
              <SelectTrigger className="w-full h-14 text-base border-2 rounded-xl hover:border-blue-400 transition-colors">
                <SelectValue placeholder="Selecciona tu estado" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {states.map((state) => (
                  <SelectItem 
                    key={state.value} 
                    value={state.value} 
                    className="text-base py-3 hover:bg-blue-50"
                  >
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {touched && selectedState && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 animate-slideUp">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Perfecto! Tenemos formatos específicos para {states.find(s => s.value === selectedState)?.label}
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <p className="text-sm text-blue-800 text-center">
                🚀 <strong>Pronto en todos los Estados Unidos</strong><br/>
                <span className="text-xs">Más estados próximamente</span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8">
        <Button
          onClick={handleNext}
          disabled={!selectedState}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
        >
          <span>Continuar</span>
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
        
        <p className="text-center text-xs text-gray-500 mt-4">
          Paso 1 de 4 • Selección de Estado
        </p>
      </div>
    </div>
  );
};