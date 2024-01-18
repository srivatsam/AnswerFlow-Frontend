import React, { useEffect, useState } from "react";
import { DataSourceSelection } from "../stepEComponents/stepEComponents";
import ProgressBar from "../stepEComponents/ProgressBar";
import { APIBACKEND } from "@/utils/constData";
import db from "@/utils/db";
import { getUserById } from "@/utils/dbFunctions/user";
type props = { handleNext: () => void };

function StepE({ handleNext }: props) {
  const [userPlan, setUserPlan] = useState();

  const getUserPlan = async () => {
    try {
      const response = await fetch(`${APIBACKEND}/get_user/4`, {
        method: "GET",
      });
      const responseData = await response.json();
      setUserPlan(responseData.user.plan.name);
      if (responseData.status != "success") {
        throw new Error(`HTTP error! Status: ${responseData.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getUserPlan();
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
