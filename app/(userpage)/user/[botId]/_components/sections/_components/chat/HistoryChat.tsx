import React, { useState, useTransition } from "react";
import Image from "next/image";
import { updateChatTitle } from "@/actions/updateChatTitle";
import { toast } from "sonner";
import { deleteChat } from "@/actions/deleteChat";
type props = {
  pastChat: any;
  setActiveChat: React.Dispatch<any>;
  activeChat: any;
};
export function HistoryChat({ pastChat, activeChat, setActiveChat }: props) {
  const [isPending, startTransition] = useTransition();
  const [chatTitle, setChatTitle] = useState("");
  const [changing, setChanging] = useState();

  const unFocusHandle = async (chatId: string) => {
    setChanging(undefined);
    if (chatTitle.trim().length == 0) {
      setChatTitle("unnamed");
    }
    startTransition(() => {
      const updateTitlePromise = updateChatTitle(chatId, chatTitle).then(
        (data) => {
          if (data.status == "success") {
            setChanging(undefined);
          }
        }
      );

      toast.promise(updateTitlePromise, {
        loading: "Loading...",
        success: "Title Updated Successfully",
        error: (error) => `${error.message}`,
      });
    });
  };
  const deleteHandle = async (chatId: string) => {
    startTransition(() => {
      const updateTitlePromise = deleteChat(chatId).then((data) => {
        if (data.status == "success") {
          setChanging(undefined);
        }
      });

      toast.promise(updateTitlePromise, {
        loading: "Loading...",
        success: "Chat Deleted Successfully",
        error: (error) => `${error.message}`,
      });
    });
  };
  const onEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    chatId: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      unFocusHandle(chatId);
    }
  };

  return (
    <div className="max-h-[67vh] overflow-y-auto ">
      {pastChat
        .slice()
        .reverse()
        .map((chat: any) => (
          <div
            key={chat.id}
            className={`hover:bg-[#252525] transition-all border-b-[0.5px] border-[#252525] text-[#707070] hover:text-white flex justify-between items-center gap-2 group pr-1 relative ${
              activeChat == chat.id && "bg-[#252525] text-white"
            }`}
          >
            <div
              onClick={() => {
                setActiveChat(chat.id);
              }}
              className="cursor-pointer flex-1 flex flex-col"
            >
              <p className="whitespace-nowrap text-ellipsis overflow-hidden pl-8 py-6">
                {chat.title}
              </p>
              <p className="text-gray-300">{chat.date}</p>
            </div>
            <div className="flex items-center shrink-0">
              <Image
                src={"/change.png"}
                alt="change title image"
                width={15}
                height={15}
                onClick={() => {
                  setChanging(chat.id);
                  setChatTitle(chat.title);
                }}
                className=" invisible group-hover:visible transition-all cursor-pointer hover:bg-[#707070] rounded-full p-2 w-[32px] h-[32px] "
              />
              <Image
                src={"/delete.png"}
                alt="change title image"
                width={15}
                height={15}
                onClick={() => {
                  deleteHandle(chat.id);
                }}
                className=" invisible group-hover:visible transition-all cursor-pointer  hover:bg-[#ff8383] rounded-full p-2 w-[32px] h-[32px]"
              />
            </div>
            {changing == chat.id && (
              <input
                onKeyDown={(e) => onEnterKey(e, chat.id)}
                onBlur={(e) => unFocusHandle(chat.id)}
                type="text"
                name=""
                id=""
                value={chatTitle}
                onChange={(e) => {
                  setChatTitle(e.target.value);
                }}
                className=" absolute left-0 top-0 h-full w-full px-8 py-6 bg-black outline-none"
              />
            )}
          </div>
        ))}
    </div>
  );
}
