import React, { useState, useTransition } from "react";

import { addDataSourceDoc } from "@/actions/addDataSourceDoc";

import { toast } from "sonner";
import Image from "next/image";

export function DocumentsManage() {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File[]>([]);
  const addFilesDataSource = async () => {
    const formDataInputs = new FormData();
    file.map((file) => formDataInputs.append("file", file));

    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(async () => {
        const addDataPromise = await addDataSourceDoc(formDataInputs, botId);
        if (addDataPromise.success) {
          const fileData = formDataInputs.get("file") as File;
          setFile([]);
          toast.success(addDataPromise.success);
        }
        if (addDataPromise.error) {
          toast.error(addDataPromise.error);
        }
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFile((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  };
  const handleDelete = (fileNameToDelete: string) => {
    setFile((prev) => prev.filter((file) => file.name !== fileNameToDelete));
  };
  return (
    <form
      action={addFilesDataSource}
      className="flex flex-col justify-between w-fit absolute top-[120%] right-0 z-[1]"
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-[#232323] rounded-[10px] px-8 py-6 lg:px-16 lg:py-10 outline-none flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[18px] font-medium">Upload Documents</h1>
            <p className="text-[14px] text-[#606060]">
              (Supports doc, docx, xls, xlsx,
              <br /> pdf, ppt, pptx)
            </p>
            <div className="relative py-4">
              <div className="absolute w-full h-4 top-0 left-0 bg-gradient-to-b from-[#232323]  to-transparent" />
              <div className="absolute w-full h-4 bottom-0 left-0 bg-gradient-to-t from-[#232323] to-transparent" />
              <div className="flex flex-col gap-2 max-h-[150px] overflow-auto px-2 max-w-[220px]">
                {file.map((file) => (
                  <div
                    key={file.name}
                    className="text-blue-500 flex gap-4 justify-between z-20 relative"
                  >
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden ">
                      {file.name} selected
                    </p>
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="shrink-0 z-20"
                    >
                      <Image
                        src={"/delete.png"}
                        alt="delete image"
                        width={10}
                        height={10}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <label
            htmlFor="file"
            className="bg-[#1C1C1C] text-[16px] px-8 py-2 rounded-[10px] cursor-pointer"
          >{` ${
            file.length > 0 ? "Add more files.." : "Select files.."
          }`}</label>
          <button
            disabled={file.length == 0 || isPending}
            type="submit"
            className={`btn sec flex !justify-around ${
              (isPending || file.length == 0) && "opacity-50 cursor-not-allowed"
            }`}
          >
            <p>{isPending ? "Adding Data Source" : "Add to Data Source"}</p>
          </button>
        </div>
        <input
          accept=".doc, .docx, .xls, .xlsx, .pdf, .ppt, .pptx"
          multiple
          type="file"
          id="file"
          name="file"
          onChange={(e) => handleFileChange(e)}
          required
          placeholder="Select an option"
        />
      </div>
    </form>
  );
}
