interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="w-full bg-gray-200 h-2">
      <div 
        className="h-2 transition-all duration-300"
        style={{ 
          backgroundColor: '#de1f27',
          width: `${(currentStep / totalSteps) * 100}%` 
        }}
      />
      <div className="text-center py-2 text-sm text-muted-foreground">
        Paso {currentStep} de {totalSteps}
      </div>
    </div>
  );
};