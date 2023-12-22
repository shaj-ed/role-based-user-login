import { useState } from "react";

export const useMultistepForm = (steps) => {
  const [stepIndex, setStepIndex] = useState(0);

  const nextStep = () => {
    if (stepIndex === steps.length - 1) return;
    setStepIndex((prev) => prev + 1);
  };

  const prevStep = () => {
    if (stepIndex === 0) return;
    setStepIndex((prev) => prev - 1);
  };

  return {
    stepIndex,
    step: steps[stepIndex],
    lastStep: steps.length - 1,
    nextStep,
    prevStep,
  };
};
