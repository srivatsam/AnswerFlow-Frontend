"use client";
import { StepA } from "./steps/StepA";
import { StepB } from "./steps/StepB";
import { StepC } from "./steps/StepC";
import { StepD } from "./steps/StepD";
import { StepFinal } from "./steps/StepFinal";

import { useSteps } from "@/hooks/use-steps";
import { useProgressBar } from "@/hooks/use-progressbar-hook";
import { FormProvider } from "@/context/FormContext";

import { AnimatePresence } from "framer-motion";

function Setup() {
  const { activeStep, setActiveStep } = useSteps((state) => state);
  const increaseProgress = useProgressBar((state) => state.increaseProgress);

  // switch (activeStep) {
  //   case "a":
  //     increaseProgress(0);
  //     break;
  //   case "b":
  //     increaseProgress(1);
  //     break;
  //   case "c":
  //     increaseProgress(2);
  //     break;
  //   case "d":
  //     increaseProgress(3);
  //     break;
  //   case "final":
  //     increaseProgress(4);
  //     break;

  //   default:
  //     break;
  // }
  const handleNext = () => {
    if (activeStep === "a") {
      setActiveStep("b");
    } else if (activeStep === "b") {
      setActiveStep("c");
    } else if (activeStep === "c") {
      setActiveStep("d");
    } else if (activeStep === "d") {
      setActiveStep("final");
    }
  };

  return (
    <div className="relative overflow-hidden w-[100%]">
      <FormProvider>
        <AnimatePresence>
          {activeStep === "a" && <StepA handleNext={handleNext} />}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === "b" && <StepB handleNext={handleNext} />}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === "c" && <StepC handleNext={handleNext} />}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === "d" && <StepD handleNext={handleNext} />}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === "final" && <StepFinal />}
        </AnimatePresence>
      </FormProvider>
    </div>
  );
}

export default Setup;
