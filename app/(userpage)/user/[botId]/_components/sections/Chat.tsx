import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import { ChatAPI } from "@/utils/constData";
import { getHistoryAction } from "@/actions/getHistoryAction";
import { revalidateChat } from "@/actions/revalidateChat";
import { getUserData } from "@/actions/getUserData";

type props = {
  botData: any;
  pastChat?: any;
  chatIdProp?: string;
  setActiveChat?: React.Dispatch<any>;
};
function Chat({ botData, chatIdProp, pastChat, setActiveChat }: props) {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [question, setQuestion] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [response, setResponse] = useState("");
  const [chatId, setChatId] = useState(chatIdProp);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<ChatItemType[]>([]);

  const getHistory = async (chatId: string) => {
    try {
      const data = await getHistoryAction(chatId);
      return data;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }
  };
  const fetchChatHistory = async (chatIdProp: string) => {
    try {
      const historyData = await getHistory(chatIdProp);
      setChat(historyData);
    } catch (error) {
      console.error("Error updating chat history:", error);
    }
  };
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
      await fetch(`${ChatAPI}/flask/chat/${botData.key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          streaming: true,
          user_id: "cls4l3i1b00008tqrll9og6d4",
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
              } else if (values.length > 1) {
                console.log(JSON.parse(values[1].trim()));
                const responseData = JSON.parse(values[1].trim());
                if (setActiveChat) setActiveChat(responseData.chat_id);
                setChatId(responseData.chat_id);
              }
              readChunk();
            });
          };
          readChunk();
          setResponse("");
        })
        .catch((error) => console.error(error))
        .finally(() => {
          revalidateChat();
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserData();
      if (user) setUserName(user.firstName + " " + user.lastName);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (chatIdProp) {
      fetchChatHistory(chatIdProp);
      setChatId(chatIdProp);
    } else if (pastChat) {
      if (pastChat.length !== 0) {
        fetchChatHistory(pastChat[pastChat.length - 1].id);
        setChatId(pastChat[pastChat.length - 1].id);
      }
    }
    if (chatIdProp == undefined) {
      setChat([]);
      setChatId(chatIdProp);
    }
  }, [chatIdProp]);

  // render the stream response and scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
      console.log(container.scrollHeight);
      console.log(container.scrollTop);
    }
  }, [chat]);
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
      console.log(container);
      console.log(container.scrollTop);
    }
    setChat((prevChat) => {
      if (prevChat.length > 1) {
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
      <div className="relative">
        <div className="absolute w-full h-4 top-0 left-0 bg-gradient-to-b from-[#131313] to-transparent" />
        <div className="absolute w-full h-4 bottom-0 left-0 bg-gradient-to-t from-[#131313] to-transparent" />
        <div
          ref={chatContainerRef}
          className="gap-10 flex flex-col max-h-[65vh] overflow-y-auto p-4 "
        >
          <div className="flex gap-4 items-start">
            <Image
              src={"/favicon.png"}
              alt="favicon image"
              width={48}
              height={48}
              className="rounded-full"
            />
            <p className="text-[] bg-[#1F1F1F] px-8 py-4 rounded-[10px] markdown-container ">
              <ReactMarkdown remarkPlugins={[gfm]}>
                {`👋 Hello, dear ${userName.toLocaleUpperCase()} ! I'm your friendly assistant, ${
                  botData.name
                }. 🤖 How may I assist you today? 🌟`}
              </ReactMarkdown>
            </p>
          </div>
          {chat?.map((chat, i) => (
            <div className="flex gap-4 items-start " key={i}>
              {chat.role == "user" ? (
                <div className="w-[48px] h-[48px] bg-[#ffffff] rounded-full overflow-hidden">
                  <Image
                    src={
                      (session.data?.user?.image as string) || "/profile.jpg"
                    }
                    alt="user image"
                    width={48}
                    height={48}
                    className=""
                  />
                </div>
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
              <p className="bg-[#1F1F1F] px-8 py-4 rounded-[10px]">
                <p className="bg-[#ffffff] w-4 h-4 rounded-full animate-pulse" />
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
          <div className="w-[40px] h-[40px] bg-[#ffffff] rounded-full overflow-hidden">
            <Image
              src={(session.data?.user?.image as string) || "/profile.jpg"}
              alt="user image"
              width={40}
              height={40}
              className=""
            />
          </div>

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
