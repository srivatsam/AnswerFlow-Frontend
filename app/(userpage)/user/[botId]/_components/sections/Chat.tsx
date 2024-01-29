import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { ChatAPI } from "@/utils/constData";

import { toast } from "sonner";

type props = {
  botData: any;
  chatIdProp?: string;
};

function Chat({ botData, chatIdProp }: props) {
  const [chatId, setChatId] = useState(chatIdProp);
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<ChatItemType[]>([
    {
      role: "ass",
      content: `👋 Hello, dear ${session.data?.user.name?.toLocaleUpperCase()} ! I'm your friendly assistant, ${
        botData.name
      }. 🤖 How may I assist you today? 🌟`,
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

      await fetch(`${ChatAPI}/flask/chat/${botData.key}`, {
        method: "POST",
        // cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          streaming: true,
          user_id: "1",
          chat_id: chatId,
        }),
      })
        .then((stream) => {
          // let lastMessage: ChatItemType = {
          //   role: "ass",
          //   content: "",
          // };
          // setChat((prevChat) => [...prevChat, lastMessage]);
          const reader = stream.body!.getReader();
          const textDecoder = new TextDecoder("utf-8");
          function readChunk() {
            reader.read().then(({ done, value }) => {
              if (done) {
                console.log("End of stream");
                return;
              }
              console.log(textDecoder.decode(value));
              // setChat((prevChat) => {
              //   let lastMessageBot = prevChat[prevChat.length - 1];

              //   lastMessageBot.content += textDecoder.decode(value);
              //   prevChat[prevChat.length - 1] = lastMessageBot;
              //   return prevChat;
              // });
              readChunk();
            });
          }
          readChunk();
        })
        .catch((error) => console.error(error));
      setLoading(false);
    }
  };
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="flex-1 bg-[#131313] rounded-[12px] p-8 gap-10 flex flex-col justify-between">
      <div ref={chatContainerRef} className="relative">
        <div className="absolute w-full h-4 top-0 left-0 bg-gradient-to-b from-[#131313] to-transparent" />
        <div className="absolute w-full h-4 bottom-0 left-0 bg-gradient-to-t from-[#131313] to-transparent" />
        <div className="gap-10 flex flex-col max-h-[65vh] overflow-y-auto p-4 ">
          {chat?.map((chat, i) => (
            <div className="flex gap-4 items-start " key={i}>
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
              <p className="text-[] bg-[#1F1F1F] px-8 py-4 rounded-[10px] markdown-container ">
                {/* <ReactMarkdown remarkPlugins={[gfm]}>
                {chat.content}
              </ReactMarkdown> */}
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
