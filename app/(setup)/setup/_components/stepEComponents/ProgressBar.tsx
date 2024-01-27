import { useFormContext } from "@/context/FormContext";
import Image from "next/image";
import React from "react";

export default function ProgressBar() {
  const { formData } = useFormContext();

  return (
    <div className="min-h-screen w-[33%] bg-[#0B0B0B] py-30 flex flex-col justify-center items-start gap-20">
      <h2 className="px-20 text-[#707070] text-[32px] font-bold">
        Setup Progress
      </h2>
      <div className="flex flex-col justify-center items-start gap-10">
        <div className="flex flex-col justify-start items-start gap-6 px-20">
          <p className="text-[#9D9D9D] uppercase ">1. basic settings</p>
          {formData.botName ? (
            <p className="text-[18px] h-[31px] whitespace-nowrap text-ellipsis overflow-hidden max-w-[350px]">
              {formData.botName}
            </p>
          ) : (
            <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
          )}
        </div>
        <br />
        <div className="flex flex-col justify-start  items-start gap-6 px-20">
          <p className="text-[#9D9D9D] uppercase">2. Data sources</p>
          {formData.files.length > 0 || formData.urls.length > 0 ? (
            <div className="relative py-4">
              <div className="absolute w-full h-6 top-0 left-0 bg-gradient-to-b from-[#0B0B0B] to-transparent" />
              <div className="absolute w-full h-6 bottom-0 left-0 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
              <div className="flex flex-col gap-2 max-h-[250px] min-h-[140px] overflow-auto px-2">
                {formData.files.map((file, i) => (
                  <div key={i} className="flex gap-2 items-center  ">
                    {/* {file.type != "application/pdf" && ( */}
                    <Image
                      src={"/file.png"}
                      width={26}
                      height={26}
                      alt="file image"
                    />
                    {/* )} */}
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[350px]">
                      {file.name}
                    </p>
                  </div>
                ))}
                {formData.urls.map((url, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Image
                      src={"/Links.png"}
                      width={26}
                      height={26}
                      alt="link image"
                    />
                    <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[350px] ">
                      {url}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
            </div>
          )}
        </div>
        <br />
        <div className="flex flex-col justify-start items-start gap-6 px-20">
          <p className="text-[#9D9D9D] uppercase">3. create bot</p>
          <div className="flex flex-col gap-2  ">
            {formData.files.length > 0 || formData.urls.length > 0 ? (
              <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[350px] ">
                {formData.botName} Bot is ready to go Live!🚀
              </p>
            ) : (
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
            )}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
