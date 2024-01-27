import React, { useState, useTransition } from "react";

import { addDataSourceDoc } from "@/actions/addDataSourceDoc";

import { toast } from "sonner";

export function DocumentsManage() {
  const [formData, setFormData] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();

  const addFilesDataSource = async (formDataInputs: FormData) => {
    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(() => {
        const setPlanPromise = addDataSourceDoc(formDataInputs, botId).then(
          (data) => {
            if (data.success) {
              const fileData = formDataInputs.get("file") as File;
              setFormData((prev) => [...prev, fileData]);
            }
          }
        );
        toast.promise(setPlanPromise, {
          loading: "Loading...",
          success: "Data Added Successfully.",
          error: "This File Not Supported, or UNIQUE File",
        });
      });
    }
  };
  return (
    <form
      action={addFilesDataSource}
      className="flex flex-col justify-between w-fit absolute top-[120%] right-0 z-[1]"
    >
      <div className="flex flex-col gap-10 w-full">
        <label
          htmlFor="file"
          className="bg-[#232323] rounded-[10px] px-16 py-14 outline-none flex flex-col gap-10 justify-center items-center cursor-pointer"
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[18px] font-medium">Upload Documents</h1>
            <p className="text-[14px] text-[#606060]">
              (Supports doc, docx, xls, xlsx,
              <br /> pdf, ppt, pptx)
            </p>
          </div>
          <div className="bg-[#1C1C1C] text-[16px] px-8 py-2 rounded-[10px]">{` ${
            formData.length > 0 ? "Add more files.." : "Select files.."
          }`}</div>
          <button type="submit" className="">
            add
          </button>
        </label>
        <input
          type="file"
          id="file"
          name="file"
          required
          placeholder="Select an option"
        />
      </div>
    </form>
  );
}
