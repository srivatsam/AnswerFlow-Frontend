import { getUserPlan } from "@/actions/getUserPlan";
import DropDownSelection from "@/app/(setup)/setup/_components/stepEComponents/DropDownSelection";
import { limitPlan } from "@/utils/constData";
import React, { useEffect, useState } from "react";

type props = {
  botData: any;
};
function DataSources({ botData }: props) {
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

  const planSelected = limitPlan.find((plan) => plan.name === userPlan);
  const [fileTypeSelected, setFileTypeSelected] =
    useState<fileTypeSelected>("Add Data Source");
  return (
    <div className="flex-1 bg-[#131313] rounded-[12px] p-10">
      <div className="">
        <h1>Manage Data Sources</h1>
        <DropDownSelection
          planSelected={planSelected}
          fileTypeSelected={fileTypeSelected}
          setFileTypeSelected={setFileTypeSelected}
        />
      </div>
    </div>
  );
}

export default DataSources;
