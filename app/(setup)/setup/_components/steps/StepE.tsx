import React, { useEffect, useState } from "react";
import { DataSourceSelection } from "../stepEComponents/stepEComponents";
import ProgressBar from "../stepEComponents/ProgressBar";
type props = { handleNext: () => void };

function StepE({ handleNext }: props) {
  const [userPlan, setUserPlan] = useState();

  const getUserPlan = async () => {
    try {
      const response = await fetch(
        `//ec2-13-127-192-129.ap-south-1.compute.amazonaws.com/get_user/4`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();
      setUserPlan(responseData.user.plan.name);
      console.log(responseData);
      if (responseData.status != "success") {
        throw new Error(`HTTP error! Status: ${responseData.status}`);
      }
      // localStorage.setItem("botId", responseData.bot.id);
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
