import React, { useState, useTransition } from "react";
import Chat from "./Chat";
import { HistoryChat } from "./_components/chat/HistoryChat";
import { useActiveSection } from "@/hooks/use-active-section";

type props = {
  pastChat: any;
  botData: any;
};
function PastChat({ pastChat, botData }: props) {
  const setActiveSection = useActiveSection((state) => state.setActiveSection);
  const [activeChat, setActiveChat] = useState(
    pastChat.length !== 0 ? pastChat[pastChat.length - 1].id : undefined
  );
  return (
    <div className="flex-1 flex gap-6">
      <div className="bg-[#131313] rounded-[12px] flex flex-col py-2 w-[290px]">
        <div className="px-8 py-6 border-b-[0.5px] border-[#252525]">
          <button
            onClick={() => setActiveChat(undefined)}
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
