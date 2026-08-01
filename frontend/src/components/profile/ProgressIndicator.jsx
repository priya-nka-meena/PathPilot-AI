const STEP_LABELS = [
  "Basic Info",
  "Career",
  "Skills",
  "Resume",
  "About",
];

function ProgressIndicator({ currentStep, totalSteps }) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{STEP_LABELS[currentStep - 1]}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 hidden justify-between sm:flex">
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={label}
              className={`flex flex-col items-center gap-1.5 ${
                index < STEP_LABELS.length - 1 ? "flex-1" : ""
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isComplete
                    ? "bg-indigo-600 text-white"
                    : isCurrent
                      ? "border-2 border-indigo-600 bg-indigo-50 text-indigo-600"
                      : "border border-slate-200 bg-white text-slate-400"
                }`}
              >
                {isComplete ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`hidden text-center text-xs lg:block ${
                  isCurrent ? "font-medium text-indigo-600" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressIndicator;
