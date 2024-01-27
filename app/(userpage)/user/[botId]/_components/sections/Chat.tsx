import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { ChatAPI } from "@/utils/constData";

import { toast } from "sonner";

type props = {
  botData: any;
};

function Chat({ botData }: props) {
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<ChatItemType[]>([
    {
      role: "ass",
      content: "Hello user ",
    },
  ]);
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
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
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.status == "error") {
          throw new Error(`ERROR FROM CLIENT BOT:${responseData.message}`);
        }
        const lastMessage: ChatItemType = {
          role: "ass",
          content: responseData.response,
        };

        setChat((prevChat) =>
          prevChat ? [...prevChat, lastMessage] : [lastMessage]
        );
        if (lastMessage && lastMessage.role === "ass" && !loading) {
          const words = lastMessage.content.split(" ");
          lastMessage.content = words[0];
          const wordInterval = 200;

          let wordIndex = 0;
          const intervalId = setInterval(() => {
            setChat((prevChat) => {
              const updatedMessages = [...prevChat];
              const newMessage = { ...updatedMessages[prevChat.length - 1] };
              newMessage.content += " " + words[wordIndex];
              updatedMessages[prevChat.length - 1] = newMessage;
              return updatedMessages;
            });

            wordIndex += 1;
            if (wordIndex === words.length - 1) {
              clearInterval(intervalId);
            }
          }, wordInterval);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Something Went Wrong");
        setLoading(false);
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
        {loading && (
          <div className="flex gap-4 items-start">
            <Image
              src={"/favicon.png"}
              alt="favicon image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-[] bg-[#1F1F1F] px-8 py-4 rounded-[10px]">
              .....
            </p>
          </div>
        )}
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
        <button type="submit" disabled={loading}>
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
