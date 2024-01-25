import { getBotResources } from "@/actions/getBotResources";
import { getUserPlan } from "@/actions/getUserPlan";
import DropDownSelection from "@/app/(setup)/setup/_components/stepEComponents/DropDownSelection";
import { limitPlan } from "@/utils/constData";
import React, { useEffect, useState } from "react";

type props = {
  botData: any;
};
function DataSources({ botData }: props) {
  const [userPlan, setUserPlan] = useState();
  const [resources, setResources] = useState<any>();

  useEffect(() => {
    getUserPlan().then((data) => {
      if (data?.error) {
      }
      if (data?.success) {
        setUserPlan(data.userPlan);
      }
    });
    getBotResources(botData.id).then((data) => {
      if (data?.success) {
        setResources(data.data);
      }
    });
  }, [botData.id]);

  const planSelected = limitPlan.find((plan) => plan.name === userPlan);
  const [fileTypeSelected, setFileTypeSelected] =
    useState<fileTypeSelected>("Add Data Source");
  return (
    <div className="flex-1 bg-[#131313] rounded-[12px] p-10 flex flex-col gap-10">
      <div className="">
        <DropDownSelection
          planSelected={planSelected}
          fileTypeSelected={fileTypeSelected}
          setFileTypeSelected={setFileTypeSelected}
        />
      </div>
      <hr />
      <div className="">
        {resources ? (
          resources.map((resource: any) => (
            <div key={resource.id}>{resource.name}</div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default DataSources;
