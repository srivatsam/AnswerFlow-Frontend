import Image from "next/image";
import React, { useState, useTransition } from "react";

import { deleteResource } from "@/actions/deleteResource";
import DropDownSelection from "@/app/(setup)/setup/_components/stepEComponents/DropDownSelection";
import { limitPlan } from "@/utils/constData";
import { toast } from "sonner";
import { DocumentsManage } from "./_components/dataSources/DocumentsManage";
import { LinkManage } from "./_components/dataSources/LinkManage";

type props = {
  botData: any;
  userPlan: string;
  botResources: {
    success: string;
    data: any;
  };
};
function DataSources({ botData, userPlan, botResources }: props) {
  const [toggleDataPopUp, setToggleDataPopUp] = useState(false);
  const [isPending, startTransition] = useTransition();

  const planSelected = limitPlan.find((plan) => plan.name === userPlan);
  const [fileTypeSelected, setFileTypeSelected] =
    useState<fileTypeSelected>("Add Data Source");

  const deleteHandle = (resourceId: string) => {
    startTransition(() => {
      const setPlanPromise = deleteResource(botData.id, resourceId);
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Resource Deleted Successfully",
        error: "Something Went Wrong Try Agin",
      });
    });
  };
  return (
    <div className="flex-1 bg-[#131313] rounded-[12px] p-10 flex flex-col gap-10">
      <div className="relative">
        <DropDownSelection
          setToggleDataPopUp={setToggleDataPopUp}
          planSelected={planSelected}
          fileTypeSelected={fileTypeSelected}
          setFileTypeSelected={setFileTypeSelected}
        />
        {toggleDataPopUp && (
          <div
            onClick={() => {
              setToggleDataPopUp(false);
            }}
            className="fixed w-screen h-screen top-0 left-0 z-[1]"
          ></div>
        )}
        {toggleDataPopUp && fileTypeSelected == "Documents" && (
          <DocumentsManage />
        )}
        {toggleDataPopUp && fileTypeSelected == "Links" && <LinkManage />}

        {/* {toggleDataPopUp && fileTypeSelected == "Zapier" && (
          <ZapierForm handleNext={() => {}} />
        )}
        {toggleDataPopUp && fileTypeSelected == "Database" && (
          <DataBaseForm handleNext={() => {}} />
        )} */}
      </div>
      <hr />
      <div className="flex flex-col gap-8 w-full">
        {botResources.data ? (
          botResources.data.map((resource: any) => (
            <div key={resource.id} className="w-full flex justify-between ">
              <div className="flex gap-6">
                <Image
                  src={"/file.png"}
                  width={24}
                  height={24}
                  alt="doc image"
                />
                <h1>{resource.name}</h1>
              </div>
              <div className="flex gap-4">
                <button>
                  <Image
                    src={"/settings2.png"}
                    width={18}
                    height={18}
                    alt="settings image"
                  />
                </button>
                <button onClick={() => deleteHandle(resource.id)}>
                  <Image
                    src={"/delete.png"}
                    width={18}
                    height={18}
                    alt="delete image"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default DataSources;
