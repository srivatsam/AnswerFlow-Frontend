import { useFormContext } from "@/context/FormContext";
import { useProgressBar } from "@/hooks/use-progressbar-hook";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";
type props = { handleNext: () => void };
export function StepD({ handleNext }: props) {
  const { formData } = useFormContext();
  console.log("stepF render");
  useEffect(() => {
    setTimeout(() => {
      handleNext();
    }, 2000);
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col gap-10 text-center justify-center items-center "
    >
      <div className="">
        <Image src={"/logoDark.png"} width={120} height={120} alt="logoDark" />
      </div>
      <div className="">
        <h2 className="text-[#606060] font-bold text-[36px]">
          {formData.botName} Bot is getting ready...
        </h2>
        <p className="text-[#737373]  text-[20px]">
          Please hold on while I’m learning from your Data Sources..
        </p>
      </div>
      <p className="text-[#737373]  text-[16px]">
        You will be able to edit Data Sources later
      </p>
    </motion.div>
  );
}
