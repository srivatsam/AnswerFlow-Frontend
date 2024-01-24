import React, { useEffect, useState } from "react";

import { DataSourceSelection } from "../stepEComponents/stepEComponents";
import ProgressBar from "../stepEComponents/ProgressBar";

import { getUserPlan } from "@/actions/getUserPlan";

import { motion } from "framer-motion";

type props = { handleNext: () => void };

function StepE({ handleNext }: props) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-center w-full"
    >
      {/* selection type toggle */}
      <DataSourceSelection userPlan={userPlan!} handleNext={handleNext} />
      {/* setup progress bar display what user added */}
      <ProgressBar />
    </motion.div>
  );
}

export default StepE;
