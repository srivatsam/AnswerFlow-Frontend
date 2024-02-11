import React, { useState, useTransition } from "react";

import { addDataSourceDoc } from "@/actions/addDataSourceDoc";
import { useFormContext } from "@/context/FormContext";

import { toast } from "sonner";
import Image from "next/image";
import { useProgressBar } from "@/hooks/use-progressbar-hook";

type props = { handleNext: () => void };

export function DocumentsForm({ handleNext }: props) {
  const increaseProgress = useProgressBar((state) => state.increaseProgress);
  const { formData, setFiles } = useFormContext();
  const [isPending, startTransition] = useTransition();

  const addFilesDataSource = async () => {
    const formDataInputs = new FormData();
    file.map((file) => formDataInputs.append("file", file));

    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(() => {
        const setPlanPromise = addDataSourceDoc(formDataInputs, botId).then(
          (data) => {
            if (data) {
              setFile([]);
              const fileData = formDataInputs.getAll("file") as File[];
              setFiles(fileData);
              // increaseProgress(7);
              // console.log("asd", increaseProgress(7));
            }
          }
        );

        toast.promise(setPlanPromise, {
          loading: "Loading...",
          success: "Data Added Successfully",
          error: (error) => `${error.message}`,
        });
      });
    }
  };
  const [file, setFile] = useState<File[]>([]);
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
      className="flex-1 flex flex-col justify-between w-full"
    >
      <div className="flex flex-col gap-10 w-full">
        <div className="bg-[#0B0B0B] rounded-[10px] px-8 py-4 outline-none w-[100%] h-[450px] flex flex-col gap-6 justify-center items-center">
          <div className="flex flex-col gap-2 text-center items-center">
            <h1 className="text-[24px] text-[#606060] font-bold">
              Drag & Drop any Documents
            </h1>
            <p className="text-[16px] text-[#606060]">
              (Supports doc, docx, xls, xlsx, pdf, ppt, pptx)
            </p>
            <div className="relative py-4">
              <div className="absolute w-full h-4 top-0 left-0 bg-gradient-to-b from-[#0B0B0B] to-transparent" />
              <div className="absolute w-full h-4 bottom-0 left-0 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
              <div className="flex flex-col gap-2 max-h-[150px] min-h-[40px] overflow-auto px-2 max-w-[300px]">
                {file.map((file) => (
                  <div
                    key={file.name}
                    className="text-blue-500 flex gap-4 justify-between "
                  >
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden ">
                      {file.name} selected
                    </p>
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="shrink-0"
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
          <label htmlFor="file" className="btn sec cursor-pointer">{` ${
            formData.files.length > 0 ? "Add more files.." : "Choose files.."
          }`}</label>
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
      <div className="flex justify-between w-full items-center">
        <button
          disabled={file.length == 0 || isPending}
          type="submit"
          className={`btn sec flex !justify-around ${
            (isPending || file.length == 0) && "opacity-50 cursor-not-allowed"
          }`}
        >
          <p>{isPending ? "Adding Data Source" : "Add to Data Source"}</p>
        </button>
        <button
          disabled={
            isPending ||
            (formData.files.length == 0 && formData.urls.length == 0)
          }
          className={`btn sec flex !justify-around ${
            ((formData.urls.length == 0 && formData.files.length == 0) ||
              isPending) &&
            " opacity-50 cursor-not-allowed"
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <p>Finish Setup</p>
        </button>
      </div>
    </form>
  );
}
