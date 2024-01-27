import { APIBACKEND } from "@/utils/constData";
import Image from "next/image";
import React, { useState } from "react";
type props = {
  botData: any;
};
function Export({ botData }: props) {
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedScript, setIsCopiedScript] = useState(false);

  const botLink: string = `https://answerflowai.com/user/${botData.id}`;
  const botScript: string = `<div
    id="answerflowbotkey"
    data-answerflowbotkey="${botData.key}"
  ></div>
<script type="text/javascript" src="
${APIBACKEND}
/loader.js"></script>`;

  const copyScript = () => {
    setIsCopiedScript(true);
    navigator.clipboard.writeText(botScript);
    setTimeout(() => {
      setIsCopiedScript(false);
    }, 3000);
  };
  const copyLink = () => {
    setIsCopiedLink(true);
    navigator.clipboard.writeText(botLink);
    setTimeout(() => {
      setIsCopiedLink(false);
    }, 3000);
  };
  return (
    <div className="bg-[#131313] rounded-[12px] p-10 flex flex-col gap-20 items-start w-fit">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-4 ">
          <h1 className="font-bold text-[28px]">Share via Link</h1>
          <p className="text-[16px] text-[#9B9B9B]">
            Just share the link with your users
          </p>
        </div>
        <div className="rounded-[10px] bg-[#232323] py-4 px-8 text-[#BABABA] font-medium flex w-full justify-between items-center">
          <p className="w-[80%] whitespace-nowrap text-ellipsis overflow-hidden ">
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
      <div className="flex flex-col gap-10 ">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[28px]">Embed on a Website</h1>
          <p className="text-[16px] text-[#9B9B9B]">{`Copy the code below & paste it inside <body> or any <div> tag on your website `}</p>
        </div>
        <div className="px-10 py-6 rounded-[10px] bg-[#232323] text-[#BABABA] relative">
          <pre className=" whitespace-pre">
            <code className="whitespace-pre">{botScript}</code>
          </pre>
          <button onClick={copyScript} className=" absolute top-6 right-6">
            {isCopiedScript ? (
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
    </div>
  );
}

export default Export;
