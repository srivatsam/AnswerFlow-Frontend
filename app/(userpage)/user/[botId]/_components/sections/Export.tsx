import { APIBACKEND } from "@/utils/constData";
import Image from "next/image";
import React, { useState } from "react";
type props = {
  botData: any;
};
function Export({ botData }: props) {
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedScript, setIsCopiedScript] = useState(false);

  const botLink: string = `https://answerflowai.com/share/${botData.id}`;
  const botScript: string = `<div
    id="answerflowbotkey"
    data-answerflowbotkey="${botData.key}"
    data-answerflowbotname="${botData.name}">
</div>
<script type="text/javascript"src="
    https://answerflowai.com/loader.js">
</script>`;

  const copyScript = async () => {
    try {
      setIsCopiedScript(true);
      await navigator.clipboard.writeText(botScript);
      setTimeout(() => {
        setIsCopiedScript(false);
      }, 3000);
    } catch (error) {
      console.error("Unable to copy script to clipboard", error);
      setIsCopiedScript(false);
    }
  };

  const copyLink = async () => {
    try {
      setIsCopiedLink(true);
      await navigator.clipboard.writeText(botLink);
      setTimeout(() => {
        setIsCopiedLink(false);
      }, 3000);
    } catch (error) {
      console.error("Unable to copy link to clipboard", error);
      setIsCopiedLink(false);
    }
  };

  return (
    <div className="bg-[#131313] rounded-[12px] p-4 lg:p-10 flex flex-col gap-10 lg:gap-20 items-start w-full lg:w-fit">
      <div className="flex flex-col gap-4 lg:gap-10 w-full">
        <div className="flex flex-col gap-4 ">
          <h1 className="font-bold text-[28px]">Share via Link</h1>
          <p className="text-[16px] text-[#9B9B9B]">
            Just share the link with your users
          </p>
        </div>
        <div className="rounded-[10px] bg-[#232323] p-4 lg:py-4 lg:px-8 text-[#BABABA] font-medium flex w-full justify-between items-center">
          <p className="w-[94%] whitespace-nowrap text-ellipsis overflow-hidden">
            {botLink}
          </p>
          <button onClick={copyLink}>
            {isCopiedLink ? (
              <Image
                src={"/correct.png"}
                width={20}
                height={20}
                alt="copy image"
              />
            ) : (
              <Image
                src={"/copy.png"}
                width={20}
                height={20}
                alt="copy image"
              />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-10 w-full">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[28px]">Embed on a Website</h1>
          <p className="text-[16px] text-[#9B9B9B]">{`Copy the code below & paste it inside <body> or any <div> tag on your website `}</p>
        </div>
        <div className="p-4 lg:px-10 lg:py-6 rounded-[10px] bg-[#232323] text-[#BABABA] relative w-full overflow-auto">
          <button
            onClick={copyScript}
            className="absolute top-2 right-4 px-2 py-1 bg-[#1A1A1A] rounded-[6px] text-[14px]"
          >
            {isCopiedScript ? "Copied .." : "Copy Code"}
          </button>
          <pre className=" whitespace-pre">
            <code className="whitespace-pre">{botScript}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Export;
