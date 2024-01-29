import React from "react";
import Chat from "./Chat";
type props = {
  botData: any;
};
function PastChat({ botData }: props) {
  return (
    <div className="flex-1 flex gap-6">
      <div className="bg-[#131313] rounded-[12px] flex flex-col py-2">
        <div className="px-8 py-6 border-b-[0.5px] border-[#252525]">
          <button className="btn sec w-full">New Chat</button>
        </div>
        <div className="px-8 py-6 hover:bg-[#111111] transition-all cursor-pointer border-b-[0.5px] border-[#252525] text-[#707070] hover:text-white">
          <p>7th March 12:21 PM</p>
        </div>{" "}
        <div className="px-8 py-6 hover:bg-[#111111] transition-all cursor-pointer border-b-[0.5px] border-[#252525] text-[#707070] hover:text-white">
          <p>7th March 12:21 PM</p>
        </div>{" "}
        <div className="px-8 py-6 hover:bg-[#111111] transition-all cursor-pointer border-b-[0.5px] border-[#252525] text-[#707070] hover:text-white">
          <p>7th March 12:21 PM</p>
        </div>{" "}
        <div className="px-8 py-6 hover:bg-[#111111] transition-all cursor-pointer border-b-[0.5px] border-[#252525] text-[#707070] hover:text-white">
          <p>7th March 12:21 PM</p>
        </div>
      </div>
      <Chat botData={botData} />
    </div>
  );
}

export default PastChat;
