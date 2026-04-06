interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="w-full h-1 bg-border rounded-full mb-6">
        <div
          className="h-1 bg-rose rounded-full transition-all duration-500"
          style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step label */}
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs font-medium tracking-widest text-rose uppercase">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="font-sans text-sm text-muted">
          {labels[currentStep - 1]}
        </p>
      </div>
    </div>
  );
}
