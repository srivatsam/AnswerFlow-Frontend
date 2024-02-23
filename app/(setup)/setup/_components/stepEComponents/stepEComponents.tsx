import React, { useState } from "react";
import DropDownSelection from "./DropDownSelection";

import { DocumentsForm } from "./DocumentsForm";
import { LinkForm } from "./LinkForm";
import { limitPlan } from "@/utils/constData";
import { ZapierForm } from "./ZapierForm";
import { DataBaseForm } from "./DataBaseForm";
import Image from "next/image";

type props = { handleNext: () => void; userPlan: string };

export function DataSourceSelection({ handleNext, userPlan }: props) {
  const planSelected = limitPlan.find((plan) => plan.name === userPlan);
  const [fileTypeSelected, setFileTypeSelected] =
    useState<fileTypeSelected>("Add Data Source");

  return (
    <div className="flex flex-1 flex-col justify-between lg:min-h-screen items-start w-full p-0 lg:p-20 gap-10 lg:gap-14">
      <DropDownSelection
        planSelected={planSelected}
        fileTypeSelected={fileTypeSelected}
        setFileTypeSelected={setFileTypeSelected}
      />
      <span className="w-full h-[1px] bg-gray-500" />
      {/* form take from user source data based on his plan */}
      {(fileTypeSelected == "Documents" ||
        fileTypeSelected == "Add Data Source") && (
        <DocumentsForm handleNext={handleNext} />
      )}
      {fileTypeSelected == "Links" && <LinkForm handleNext={handleNext} />}
      {fileTypeSelected == "Zapier" && <ZapierForm handleNext={handleNext} />}
      {fileTypeSelected == "Database" && (
        <DataBaseForm handleNext={handleNext} />
      )}
    </div>
  );
}
