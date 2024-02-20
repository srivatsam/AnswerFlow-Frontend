import React, { useTransition } from "react";

import { addDataSourceDoc } from "@/actions/addDataSourceDoc";
import { useFormContext } from "@/context/FormContext";

import { toast } from "sonner";
import { useProgressBar } from "@/hooks/use-progressbar-hook";
import Image from "next/image";

type props = { handleNext: () => void };

export function ZapierForm({ handleNext }: props) {
  const increaseProgressByNumber = useProgressBar(
    (state) => state.increaseProgressByNumber
  );

  const { formData, setFiles } = useFormContext();
  const [isPending, startTransition] = useTransition();

  const addFilesDataSource = async (formDataInputs: FormData) => {
    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(() => {
        const setPlanPromise = addDataSourceDoc(formDataInputs, botId).then(
          (data) => {
            if (data.success) {
              const fileData = formDataInputs.get("file") as File;
              setFiles([fileData]);
              increaseProgressByNumber(0.3);
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
      <div className="flex flex-col gap-20 w-full">
        <div className="flex flex-col items-start gap-4 w-[100%]">
          <label htmlFor="links" className="text-[20px] font-medium">
            Step1: Create Zap
          </label>
          <div className="btn sec">
            <div className="flex gap-4 items-center">
              <p>Open Zapier</p>
              <Image
                src={"/Arrow.png"}
                width={16}
                height={16}
                alt="Arrow"
                className="rotate-[-90deg]"
              />
            </div>
          </div>
          <p className="text-[#9D9D9D]">
            Import data from any app through Zapier
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 w-[100%]">
          <label htmlFor="actionLink" className="text-[20px] font-medium">
            Step 2: Enter your Zap’s Action Link
          </label>
          <input
            type="text"
            id="actionLink"
            required
            name="actionLink"
            placeholder="https://my-website.com"
            className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
          />
          <p className="text-[#9D9D9D]">
            AnswerFlow AI will import content from this link to this bot’s
            Knowledge-base
          </p>
        </div>
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
            (formData.files.length == 0 &&
              formData.urls.length == 0 &&
              formData.dbs.length == 0)
          }
          className={`btn sec flex !justify-around ${
            ((formData.urls.length == 0 &&
              formData.files.length == 0 &&
              formData.dbs.length == 0) ||
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
