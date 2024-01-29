import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useFormContext } from "@/context/FormContext";
import { useSteps } from "@/hooks/use-steps";
import { motion } from "framer-motion";

function StepFinal() {
  console.log("stepFinally render");
  const { resetFormData, formData } = useFormContext();
  const resetToNewBot = useSteps((state) => state.resetToNewBot);
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
          setTimeout(() => {
            resetFormData();
            resetToNewBot();
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

export default StepFinal;
