import React, { useEffect, useState } from "react";
import { DataSourceSelection } from "../stepEComponents/stepEComponents";
import ProgressBar from "../stepEComponents/ProgressBar";
import { getUserPlan } from "@/actions/getUserPlan";
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
    <div className="min-h-screen flex justify-center items-center w-full">
      {/* selection type toggle */}
      <DataSourceSelection userPlan={userPlan!} handleNext={handleNext} />
      {/* setup progress bar display what user added */}
      <ProgressBar />
    </div>
  );
}

export default StepE;
