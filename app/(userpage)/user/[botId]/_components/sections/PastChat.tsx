"use client";
import React, { useState } from "react";
import Chat from "./Chat";
import { HistoryChat } from "./_components/chat/HistoryChat";

type props = {
  pastChat: any;
  botData: any;
};
function PastChat({ pastChat, botData }: props) {
  const [toggle, setToggle] = useState(true);
  const [activeChat, setActiveChat] = useState(
    pastChat.length !== 0 ? pastChat[pastChat.length - 1].id : undefined
  );

  return (
    <div className="flex-1 flex gap-6 h-full">
      <div
        onClick={() => {
          setToggle(false);
        }}
        className={`absolute h-screen w-screen top-0 left-0 backdrop-blur-sm z-10 cursor-pointer  ${
          toggle ? "block" : "hidden"
        } lg:hidden`}
      />
      <div
        onClick={() => {
          setToggle(true);
        }}
        className={`absolute top-[23px] left-[60px] font-bold p-2 bg-[#131313] rounded-[10px] cursor-pointer ${
          !toggle ? "block" : "hidden"
        } lg:hidden `}
      >
        Past Chat
      </div>
      <div
        className={`bg-[#131313] rounded-[12px] ${
          toggle ? "flex" : "hidden"
        } flex-col py-2 w-[200px] lg:w-[290px] absolute lg:relative h-[90%] lg:h-full z-10 shadow-lg lg:flex`}
      >
        <div className="px-8 py-6 border-b-[0.5px] border-[#252525]">
          <button
            onClick={() => {
              setToggle(false);
              setActiveChat(undefined);
            }}
            className="btn sec w-full"
          >
            New Chat
          </button>
        </div>
        <HistoryChat
          pastChat={pastChat}
          setActiveChat={setActiveChat}
          activeChat={activeChat}
        />
      </div>
      <Chat
        botData={botData}
        chatIdProp={activeChat}
        setActiveChat={setActiveChat}
      />
    </div>
  );
}

export default PastChat;
