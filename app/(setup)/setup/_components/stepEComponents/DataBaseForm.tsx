import React, { useTransition } from "react";

import { addUrlData } from "@/actions/addUrlData";
import { useFormContext } from "@/context/FormContext";

import { toast } from "sonner";
type props = { handleNext: () => void };

export function DataBaseForm({ handleNext }: props) {
  const [isPending, startTransition] = useTransition();
  const { setUrls, formData } = useFormContext();

  const addUrlDataHandle = async (formDataInputs: FormData) => {
    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(() => {
        const setPlanPromise = addUrlData(formDataInputs, botId).then(
          (data) => {
            if (data.success) {
              setUrls(formDataInputs.get("link") as string);
            }
          }
        );
        toast.promise(setPlanPromise, {
          loading: "Loading...",
          success: "Data Added Successfully",
          error: "Something Went Wrong Try Agin",
        });
      });
    }
  };
  return (
    <form
      action={addUrlDataHandle}
      className="flex-1 flex flex-col justify-between gap-6 w-full"
    >
      <div className="flex flex-col gap-6 ">
        <div className="flex gap-4 w-[100%]">
          <div className="flex flex-col gap-4 ">
            <label htmlFor="host" className="text-[20px] font-medium">
              Host
            </label>
            <input
              type="text"
              id="host"
              required
              name="host"
              placeholder="Enter a host link"
              className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
            />
          </div>
          <div className="flex flex-col gap-4 ">
            <label htmlFor="port" className="text-[20px] font-medium">
              Port
            </label>
            <input
              type="text"
              id="port"
              required
              name="port"
              placeholder="Enter a port"
              className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[100%]">
          <label htmlFor="userName" className="text-[20px] font-medium">
            Username
          </label>
          <input
            type="text"
            id="userName"
            required
            name="userName"
            placeholder="Enter a username"
            className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
          />
        </div>
        <div className="flex flex-col gap-4 w-[100%]">
          <label htmlFor="password" className="text-[20px] font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            name="password"
            placeholder="Enter a password"
            className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
          />
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <button
          disabled={isPending}
          type="submit"
          className={`btn sec flex !justify-around ${
            isPending && "opacity-50 cursor-not-allowed"
          }`}
        >
          <p>{isPending ? "Adding Data Source" : "Add to Data Source"}</p>
        </button>
        <button
          disabled={
            isPending || formData.files.length == 0 || formData.urls.length == 0
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
