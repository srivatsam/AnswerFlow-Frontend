import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { APIBACKEND, ChatAPI } from "@/utils/constData";
import { getHistoryAction } from "@/actions/getHistoryAction";
import { revalidateTag } from "next/cache";

type props = {
  botData: any;
  chatIdProp?: string;
};

function Chat({ botData, chatIdProp }: props) {
  const session = useSession();
  const [chat, setChat] = useState<ChatItemType[]>([
    {
      role: "assistant",
      content: `👋 Hello, dear ${session.data?.user.name?.toLocaleUpperCase()} ! I'm your friendly assistant, ${
        botData.name
      }. 🤖 How may I assist you today? 🌟`,
    },
  ]);
  const getHistory = async (chatId: string) => {
    try {
      const data = await getHistoryAction(chatId);
      return data;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }
  };
  useEffect(() => {
    if (chatIdProp) {
      const fetchChatHistory = async () => {
        try {
          const historyData = await getHistory(chatIdProp);
          setChat(historyData);
        } catch (error) {
          console.error("Error updating chat history:", error);
        }
      };

      fetchChatHistory();
    }
  }, [chatIdProp]);
  const [question, setQuestion] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [response, setResponse] = useState("");
  const [chatId, setChatId] = useState(chatIdProp);
  const [loading, setLoading] = useState(false);

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

      const DILIMETER = "44eabd710f0f455ea12c17564663d175";
      await fetch(`${ChatAPI}/chat/${botData.key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          streaming: true,
          user_id: session.data?.user.id,
          chat_id: chatId,
        }),
      })
        .then((stream) => {
          let lastMessage: ChatItemType = {
            role: "assistant",
            content: "",
          };
          setChat((prevChat) => [...prevChat, lastMessage]);

          const reader = stream.body!.getReader();
          const textDecoder = new TextDecoder("utf-8");

          const readChunk = () => {
            reader.read().then(({ done, value }) => {
              if (done) {
                console.log("End of stream");
                return;
              }
              let val = textDecoder.decode(value);
              let values = val.split(DILIMETER);
              if (values.length === 1) {
                setResponse((prev) => prev + values[0]);
                // console.log(values[0]);
              } else if (values.length > 1) {
                // console.log(values[0]);
                console.log(JSON.parse(values[1].trim()));
                const responseData = JSON.parse(values[1].trim());
                setChatId(responseData.chat_id);
              }
              readChunk();
            });
          };
          readChunk();
          setResponse("");
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);
  useEffect(() => {
    setChat((prevChat) => {
      if (prevChat.length > 2) {
        let lastMessageBot = prevChat[prevChat.length - 1];
        lastMessageBot.content = response;
        prevChat[prevChat.length - 1] = lastMessageBot;
        return prevChat;
      }
      return prevChat;
    });
  }, [response]);

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
                  width={48}
                  height={48}
                  className="rounded-full "
                />
              ) : (
                <Image
                  src={"/favicon.png"}
                  alt="favicon image"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <p className="text-[] bg-[#1F1F1F] px-8 py-4 rounded-[10px] markdown-container ">
                <ReactMarkdown remarkPlugins={[gfm]}>
                  {chat.content}
                </ReactMarkdown>
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
