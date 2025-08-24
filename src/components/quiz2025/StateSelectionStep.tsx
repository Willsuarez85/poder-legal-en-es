import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TipBox } from "./TipBox";

interface StateSelectionStepProps {
  selectedState: string;
  onStateSelect: (state: string) => void;
  onNext: () => void;
}

export const StateSelectionStep = ({ selectedState, onStateSelect, onNext }: StateSelectionStepProps) => {
  const states = [
    { value: 'california', label: 'California' },
    { value: 'texas', label: 'Texas' },
    { value: 'florida', label: 'Florida' }
  ];

  const handleStateSelect = (state: string) => {
    console.log('State selected:', state);
    onStateSelect(state);
  };

  const handleNext = () => {
    console.log('Next button clicked, selectedState:', selectedState);
    if (selectedState) {
      console.log('Calling onNext');
      onNext();
    } else {
      console.log('selectedState is empty, not proceeding');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="text-center">
        <CardHeader className="space-y-6">
          <CardTitle className="text-3xl font-bold">
            Encuentra el formato de carta de poder específico que necesitas
          </CardTitle>
          <h2 className="text-xl font-semibold text-muted-foreground">
            100% legal
          </h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg leading-relaxed">
            Selecciona tu estado para comenzar con el proceso personalizado
          </p>
          
          <div className="space-y-4">
            <Select value={selectedState} onValueChange={handleStateSelect}>
              <SelectTrigger className="w-full text-lg py-6">
                <SelectValue placeholder="Selecciona tu estado" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.value} value={state.value} className="text-lg py-3">
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <p className="text-sm text-muted-foreground">
              More states coming soon
            </p>
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedState}
            size="lg"
            className="text-lg px-8 py-6 h-auto w-full"
            style={{ backgroundColor: '#de1f27' }}
          >
            ➡️ Siguiente
          </Button>
        </CardContent>
      </Card>

      <TipBox>
        No todas las cartas de poder son iguales ni sirven en todos los estados
      </TipBox>
    </div>
  );
};