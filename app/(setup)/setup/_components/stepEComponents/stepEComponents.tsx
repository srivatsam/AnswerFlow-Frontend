import React, { useState } from "react";
import { DocumentsForm } from "./DocumentsForm";
import { LinkForm } from "./LinkForm";
import DropDownSelection from "./DropDownSelection";
import { limitPlan } from "@/utils/constData";

type props = { handleNext: () => void; userPlan: string };

export function DataSourceSelection({ handleNext, userPlan }: props) {
  const planSelected = limitPlan.find((plan) => plan.name === userPlan);
  const [fileTypeSelected, setFileTypeSelected] =
    useState<fileTypeSelected>("Add Data Source");

  return (
    <div className="flex flex-1 flex-col justify-between min-h-screen items-start w-full px-20 py-20 gap-20">
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
    </div>
  );
}
