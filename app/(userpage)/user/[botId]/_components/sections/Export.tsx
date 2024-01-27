import Image from "next/image";
import React, { useState } from "react";
type props = {
  botData: any;
};
function Export({ botData }: props) {
  const [botLink, setBotLink] = useState<string>(
    `https://answerflowai.com/user/${botData.id}`
  );
  const [botScript, setBotScript] = useState<string>(`<!DOCTYPE html>
  <html>
  <head>
      <title>Embedded Video</title>
  </head>
  <body>
      <div class="ec8f7ca-cac8-4e39-bab3-4944888b23da-container"></div>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/your-github-username/chatbot-loader/loader.js"></script>  
  </body>
  </html>`);
  const copyLink = () => {};
  const copyScript = () => {};
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
          <p className="w-[70%] overflow-hidden whitespace-nowrap">{botLink}</p>
          <button onClick={copyLink}>
            <Image src={"/copy.png"} width={20} height={20} alt="copy image" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-10 ">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[28px]">Embed on a Website</h1>
          <p className="text-[16px] text-[#9B9B9B]">{`Copy the code below & paste it inside <head> or any <div> tag on your website `}</p>
        </div>
        <div className="px-10 py-6 rounded-[10px] bg-[#232323] text-[#BABABA] relative">
          <pre className=" whitespace-pre">
            <code className="whitespace-pre">
              {"<!DOCTYPE html>\n"}
              {"<html>\n"}
              {"  <head>\n"}
              {"    <title>Embedded Video</title>\n"}
              {"  </head>\n"}
              {"  <body>\n"}
              {"    <h1>Embedded YouTube Video</h1>\n"}
              {
                '    <iframe width="560" height="315" src="https://www.youtube.com/\nembed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>\n'
              }
              {"  </body>\n"}
              {"</html>\n"}
            </code>
          </pre>
          <button onClick={copyScript} className=" absolute top-6 right-6">
            <Image src={"/copy.png"} width={20} height={20} alt="copy image" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Export;
