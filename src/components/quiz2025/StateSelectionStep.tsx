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
    { value: 'alabama', label: 'Alabama' },
    { value: 'alaska', label: 'Alaska' },
    { value: 'arizona', label: 'Arizona' },
    { value: 'arkansas', label: 'Arkansas' },
    { value: 'california', label: 'California' },
    { value: 'colorado', label: 'Colorado' },
    { value: 'connecticut', label: 'Connecticut' },
    { value: 'delaware', label: 'Delaware' },
    { value: 'florida', label: 'Florida' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'hawaii', label: 'Hawaii' },
    { value: 'idaho', label: 'Idaho' },
    { value: 'illinois', label: 'Illinois' },
    { value: 'indiana', label: 'Indiana' },
    { value: 'iowa', label: 'Iowa' },
    { value: 'kansas', label: 'Kansas' },
    { value: 'kentucky', label: 'Kentucky' },
    { value: 'louisiana', label: 'Louisiana' },
    { value: 'maine', label: 'Maine' },
    { value: 'maryland', label: 'Maryland' },
    { value: 'massachusetts', label: 'Massachusetts' },
    { value: 'michigan', label: 'Michigan' },
    { value: 'minnesota', label: 'Minnesota' },
    { value: 'mississippi', label: 'Mississippi' },
    { value: 'missouri', label: 'Missouri' },
    { value: 'montana', label: 'Montana' },
    { value: 'nebraska', label: 'Nebraska' },
    { value: 'nevada', label: 'Nevada' },
    { value: 'new-hampshire', label: 'New Hampshire' },
    { value: 'new-jersey', label: 'New Jersey' },
    { value: 'new-mexico', label: 'New Mexico' },
    { value: 'new-york', label: 'New York' },
    { value: 'north-carolina', label: 'North Carolina' },
    { value: 'north-dakota', label: 'North Dakota' },
    { value: 'ohio', label: 'Ohio' },
    { value: 'oklahoma', label: 'Oklahoma' },
    { value: 'oregon', label: 'Oregon' },
    { value: 'pennsylvania', label: 'Pennsylvania' },
    { value: 'rhode-island', label: 'Rhode Island' },
    { value: 'south-carolina', label: 'South Carolina' },
    { value: 'south-dakota', label: 'South Dakota' },
    { value: 'tennessee', label: 'Tennessee' },
    { value: 'texas', label: 'Texas' },
    { value: 'utah', label: 'Utah' },
    { value: 'vermont', label: 'Vermont' },
    { value: 'virginia', label: 'Virginia' },
    { value: 'washington', label: 'Washington' },
    { value: 'west-virginia', label: 'West Virginia' },
    { value: 'wisconsin', label: 'Wisconsin' },
    { value: 'wyoming', label: 'Wyoming' }
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