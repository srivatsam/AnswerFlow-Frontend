import { useFormContext } from "@/context/FormContext";
import React from "react";
type props = { handleNext: () => void };

export function DocumentsForm({ handleNext }: props) {
  const { formData, setFiles } = useFormContext();
  const addFilesDataSource = async (formDataInputs: FormData) => {
    if (formDataInputs) {
      const fileData = formDataInputs.get("file") as File;
      setFiles(fileData);
      formDataInputs.append("type", fileData.type.split("/")[1]);
      try {
        const response = await fetch(
          `//ec2-13-127-192-129.ap-south-1.compute.amazonaws.com/create_resource/1/1`,
          {
            method: "POST",
            body: formDataInputs,
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        if (!responseData.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        localStorage.setItem("botId", responseData.bot.id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <form
      action={(e) => addFilesDataSource(e)}
      className="flex-1 flex flex-col justify-between w-full"
    >
      <div className="flex flex-col gap-10 w-full">
        <label
          htmlFor="file"
          className="bg-[#0B0B0B] rounded-[10px] px-8 py-4 outline-none w-[100%] h-[450px] flex flex-col gap-6 justify-center items-center cursor-pointer"
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[24px] text-[#606060] font-bold">
              Drag & Drop any Documents
            </h1>
            <p className="text-[16px] text-[#606060]">
              (Supports doc, docx, xls, xlsx, pdf, ppt, pptx)
            </p>
          </div>
          <div className="btn sec">{` ${
            formData.files.length > 0 ? "Add more files.." : "Choose files.."
          }`}</div>
        </label>
        <input
          type="file"
          id="file"
          name="file"
          required
          placeholder="Select an option"
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <button
          // disabled={formData.openAiApiKey == ""}
          type="submit"
          className={`btn sec flex !justify-around`}
        >
          <p>Add to Data Source</p>
        </button>
        <button
          // disabled={formData.openAiApiKey == ""}
          className={`btn sec flex !justify-around ${
            formData.urls.length == 0 &&
            formData.files.length == 0 &&
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
