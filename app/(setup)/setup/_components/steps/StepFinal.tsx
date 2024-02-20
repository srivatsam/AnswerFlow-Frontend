import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import { useFormContext } from "@/context/FormContext";
import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSteps } from "@/hooks/use-steps";
import { useProgressBar } from "@/hooks/use-progressbar-hook";

export function StepFinal() {
  const increaseProgress = useProgressBar((state) => state.increaseProgress);
  console.log("stepFinally render");
  const { resetFormData, formData } = useFormContext();
  const resetToNewBot = useSteps((state) => state.resetToNewBot);

  const setActiveSection = useActiveSection((state) => state.setActiveSection);

  useEffect(() => {
    increaseProgress(4);
  }, [increaseProgress]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col gap-10 text-center justify-center items-center "
    >
      <div className="">
        <Image src={"/favicon.png"} width={120} height={120} alt="logoDark" />
      </div>
      <div className="">
        <h2 className="font-bold text-[36px]">{formData.botName}</h2>
        <p className="text-[#737373]  text-[20px]">
          Your bot is up, continue to chat!
        </p>
      </div>
      <Link
        onClick={() => {
          setActiveSection("Chat");
          setTimeout(() => {
            resetToNewBot();
            resetFormData();
          }, 1500);
        }}
        href={`/user/${localStorage.getItem("botId")}`}
        className="btn sec"
      >
        Start Chatting
      </Link>
    </motion.div>
  );
}
