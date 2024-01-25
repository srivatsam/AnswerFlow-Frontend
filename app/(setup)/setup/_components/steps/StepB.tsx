import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import animationData from "@/public/confetti.json";
import Lottie from "react-lottie";

import type { YourPlanType } from "@/types/plan";

type props = { handleNext: () => void };

function StepB({ handleNext }: props) {
  // console.log("StepB render");
  const [planFromLocal, setPlanFromLocal] = useState<YourPlanType | null>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    const playAnimation = () => {
      animationRef.current?.play();
    };
    playAnimation();

    try {
      const storedPlan = localStorage.getItem("plan");
      if (storedPlan) {
        const parsedPlan = JSON.parse(storedPlan);
        setPlanFromLocal(parsedPlan);
      }
    } catch (error) {
      console.error("Error while retrieving plan from local storage:", error);
    }
  }, []);

  const currentDate = new Date();
  let formattedDate;

  if (planFromLocal?.method == "annual") {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
  } else {
    currentDate.setMonth(currentDate.getMonth() + 1);
    formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center flex-col h-screen gap-6"
    >
      <div className="absolute top-0 w-[700px] z-[-1]">
        <Lottie
          options={{
            loop: false,
            autoplay: false,
            animationData: animationData,
          }}
        />
      </div>
      <Image
        src={"/favicon.png"}
        width={320}
        height={320}
        alt="PaymentSuccess png"
      />
      <h1 className="text-[48px] font-normal">Hoorah, Welcome to AnswerFlow</h1>
      <p className="text-[#606060] font-normal text-[21px]">
        Congratulations! You’re Subscription for the Starter Plan in now active.{" "}
        <br />
        Your plan will be automatically renewed on{" "}
        <span className="text-[#A595FA]">{formattedDate}</span>.
      </p>
      <button className="btn sec flex !justify-around" onClick={handleNext}>
        <p>Get Started</p>
        <Image
          src={"/rightarrow.png"}
          width={8}
          height={8}
          alt="rightarrow png"
        />
      </button>
    </motion.div>
  );
}

export default StepB;
