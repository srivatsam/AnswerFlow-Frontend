import React, { useTransition } from "react";

import { addDataSourceDoc } from "@/actions/addDataSourceDoc";
import { useFormContext } from "@/context/FormContext";

import { toast } from "sonner";
import { useProgressBar } from "@/hooks/use-progressbar-hook";

type props = { handleNext: () => void };

export function ZapierForm({ handleNext }: props) {
  const increaseProgressByNumber = useProgressBar(
    (state) => state.increaseProgressByNumber
  );

  const { formData, setFiles } = useFormContext();
  const [isPending, startTransition] = useTransition();

  const addFilesDataSource = async (formDataInputs: FormData) => {
    // if (formDataInputs) {
    //   const botId = window.localStorage.getItem("botId") as string;
    //   startTransition(() => {
    //     const setPlanPromise = addDataSourceDoc(formDataInputs, botId).then(
    //       (data) => {
    //         if (data.success) {
    //           const fileData = formDataInputs.get("file") as File;
    //           // setFiles(fileData);
    //           increaseProgressByNumber(0.5);
    //         }
    //       }
    //     );
    //     toast.promise(setPlanPromise, {
    //       loading: "Loading...",
    //       success: "Data Added Successfully",
    //       error: (error) => `${error.message}`,
    //     });
    //   });
    // }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files;

    if (selectedFile) {
      const formDataWithFile = new FormData();

      formDataWithFile.append("file", selectedFile[0]);

      addFilesDataSource(formDataWithFile);
    }
  };
  return (
    <form
      action={addFilesDataSource}
      className="flex-1 flex flex-col justify-between w-full"
    >
      <div className="flex flex-col gap-10 w-full">
        <label
          htmlFor="file"
          className="bg-[#0B0B0B] rounded-[10px] px-8 py-4 outline-none w-[100%] h-[450px] flex flex-col gap-6 justify-center items-center cursor-pointer"
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[24px] text-[#606060] font-bold">
              Import Data through Zapier
            </h1>
            <p className="text-[16px] text-[#606060]">
              (Connect your Zapier Account)
            </p>
          </div>
          <div className="btn sec">{` ${
            formData.files.length > 0 ? "Add more files.." : "_Z Connect Zapier"
          }`}</div>
        </label>
        <input
          onChange={handleFileChange}
          type="file"
          id="file"
          name="file"
          required
          placeholder="Select an option"
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <button
          // disabled={formData.files.length > 0 || isPending}
          type="submit"
          className={`btn sec flex !justify-around `} //${formData.files.length == 0 && "opacity-50 cursor-not-allowed"}
        >
          <p>{isPending ? "Adding Data Source.." : "Add to Data Source"}</p>
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
          onClick={handleNext}
        >
          <p>Finish Setup</p>
        </button>
      </div>
    </form>
  );
}
