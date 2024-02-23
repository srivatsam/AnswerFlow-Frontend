import React, { useEffect, useState } from "react";

import { DataSourceSelection } from "../stepEComponents/stepEComponents";
import ProgressBar from "../stepEComponents/ProgressBar";

import { getUserPlan } from "@/actions/getUserPlan";

import { motion } from "framer-motion";
import Image from "next/image";

type props = { handleNext: () => void };

export function StepC({ handleNext }: props) {
  const [toggle, setToggle] = useState(false);

  console.log("stepE render");
  const [userPlan, setUserPlan] = useState();

  useEffect(() => {
    getUserPlan().then((data) => {
      if (data?.error) {
      }
      if (data?.success) {
        setUserPlan(data.userPlan);
      }
    });
  }, []);
  // console.log(userPlan);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center lg:justify-between items-center lg:items-stretch w-full "
    >
      {/* selection type toggle */}
      <div className="flex flex-1 flex-col justify-between min-h-screen p-4 gap-4">
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="flex lg:hidden bg-[#333] rounded-[10px] p-4 justify-between items-center w-full"
        >
          <p>Bot Setup Progress</p>
          <Image src={"/Arrow.png"} alt="arrow" width={24} height={24} />
        </div>
        <DataSourceSelection userPlan={userPlan!} handleNext={handleNext} />
      </div>
      {/* setup progress bar display what user added */}
      <ProgressBar toggle={toggle} setToggle={setToggle} />
    </motion.div>
  );
}
