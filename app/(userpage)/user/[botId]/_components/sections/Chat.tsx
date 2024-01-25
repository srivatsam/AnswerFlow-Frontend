import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { ChatAPI } from "@/utils/constData";

import { toast } from "sonner";

type props = {
  botData: any;
};

function Chat({ botData }: props) {
  const [chat, setChat] = useState<ChatItemType[] | null>();
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuestion("");

    if (question.length > 0) {
      const newData: ChatItemType[] = [
        {
          role: "user",
          content: question,
        },
      ];
      setChat((prevChat) => (prevChat ? [...prevChat, ...newData] : newData));

      try {
        const response = await fetch(`${ChatAPI}/chat/${botData.key}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            chat_history: chat,
          }),
        });
        const responseData = await response.json();
        if (responseData.status == "error") {
          throw new Error(`ERROR FROM CLIENT BOT:${responseData.message}`);
        }
        const newData: ChatItemType[] = [
          {
            role: "ass",
            content: responseData.response,
          },
        ];
        setChat((prevChat) => (prevChat ? [...prevChat, ...newData] : newData));
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  };

  const session = useSession();
  return (
    <div className="flex-1 bg-[#131313] rounded-[12px] p-10 gap-10 flex flex-col justify-between">
      <div className="gap-10 flex flex-col max-h-[67vh] overflow-y-auto ">
        {chat?.map((chat, i) => (
          <div className="flex gap-4 items-start" key={i}>
            {chat.role == "user" ? (
              <Image
                src={session.data?.user?.image || "/profile.jpg"}
                alt="user image"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <Image
                src={"/favicon.png"}
                alt="favicon image"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <p className="text-[] bg-[#1F1F1F] px-8 py-4 rounded-[10px]">
              {chat.content ? chat.content : "something went wrong try agin"}
            </p>
          </div>
        ))}
      </div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="bg-[#1F1F1F] py-4 px-8 w-full flex justify-between rounded-[10px] gap-4 items-center"
      >
        <div className="flex gap-4 flex-1">
          <Image
            src={(session.data?.user?.image as string) || "/profile.jpg"}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <input
            type="text"
            id="question"
            required
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your message.."
            className=" bg-transparent flex-1 outline-none text-[20px]"
          />
        </div>
        <button>
          <Image
            src={"/send.png"}
            alt="user image"
            width={20}
            height={20}
            className="rounded-full"
          />
        </button>
      </form>
    </div>
  );
}

export default Chat;
