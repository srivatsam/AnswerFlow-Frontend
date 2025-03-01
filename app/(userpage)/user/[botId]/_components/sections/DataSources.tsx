import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";

import { deleteResource } from "@/actions/deleteResource";
import DropDownSelection from "@/app/(setup)/setup/_components/stepEComponents/DropDownSelection";
import { limitPlan } from "@/utils/constData";
import { toast } from "sonner";
import { DocumentsManage } from "./_components/dataSources/DocumentsManage";
import { LinkManage } from "./_components/dataSources/LinkManage";
import { ZapierManage } from "./_components/dataSources/ZapierManage";
import { DataBaseManage } from "./_components/dataSources/DataBaseManage";

type props = {
  botData: any;
  userPlan: string;
  botResources: any;
};
function DataSources({ botData, userPlan, botResources }: props) {
  const [toggleDataPopUp, setToggleDataPopUp] = useState(false);
  const [isPending, startTransition] = useTransition();

  const planSelected = limitPlan.find((plan) => plan.name === userPlan);
  const [fileTypeSelected, setFileTypeSelected] =
    useState<fileTypeSelected>("Add Data Source");

  const deleteHandle = (resourceId: string) => {
    startTransition(async () => {
      const deleteResourcePromise = await deleteResource(
        botData.id,
        resourceId
      );
      if (deleteResourcePromise.success) {
        toast.success(deleteResourcePromise.success);
      }
      if (deleteResourcePromise.error) {
        toast.error(deleteResourcePromise.error);
      }
    });
  };
  useEffect(() => {
    if (isPending) {
      toast.loading("loading ....");
    }
  }, [isPending]);
  return (
    <div className="flex-1 bg-[#131313] rounded-[12px] p-6 lg:p-10 flex flex-col gap-4 lg:gap-10">
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

        {toggleDataPopUp && fileTypeSelected == "Zapier" && <ZapierManage />}
        {toggleDataPopUp && fileTypeSelected == "Database" && (
          <DataBaseManage />
        )}
      </div>
      <hr />
      <div className="flex flex-col gap-8 w-full">
        {botResources.length !== 0 ? (
          botResources.map((resource: any) => (
            <div key={resource.id} className="w-full flex justify-between">
              <div className="flex gap-6 items-center w-[90%]">
                <Image
                  src={`/${resource.type}.png`}
                  width={24}
                  height={24}
                  alt={resource.type}
                />
                <h1 className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
                  {resource.name}
                </h1>
              </div>
              <div className="flex gap-4">
                {resource.name == "zip" && (
                  <button>
                    <Image
                      src={"/settings2.png"}
                      width={18}
                      height={18}
                      alt="settings image"
                    />
                  </button>
                )}
                <button onClick={() => deleteHandle(resource.id)}>
                  <Image
                    src={"/delete.png"}
                    width={17}
                    height={17}
                    alt="delete image"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="bg-red-500 p-4 lg:p-6 rounded-[10px] font-bold uppercase">
            No Data Source Founded, You Have To Add At Least For Better Answers
          </p>
        )}
      </div>
    </div>
  );
}

export default DataSources;
