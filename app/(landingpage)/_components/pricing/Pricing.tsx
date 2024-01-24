"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/hooks/use-plan-hook";
import { planNameType } from "@/types/plan";

const planData = [
  {
    name: "BASIC",
    price: 19,
    popular: false,
    features: [
      "✅ Unlimited Chats",
      "🤖 1 Bot",
      "💿 50 MB Knowledge base",
      "🔗 Share as Link",
      "🔑 Use your own OpenAI API Key",
    ],
    dataSupport: ["📄 Documents", "🔗 Links"],
  },
  {
    name: "STARTER",
    price: 99,
    popular: true,
    features: [
      "✅ Unlimited Chats",
      "🤖 5 Bots",
      "💿 1 GB Knowledge base",
      "👨 5 Seat",
      "🔗 Share as Link",
      "🧩 Website Embed",
      "🔑 Use your own OpenAI API Key",
    ],
    dataSupport: ["📄 Documents", "🔗 Links", "🧩 Zapier Integration"],
  },
  {
    name: "PRO",
    price: 299,
    popular: false,
    features: [
      "✅ Unlimited Chats",
      "🤖 5 Bots",
      "💿 1 GB Knowledge base",
      "👨 5 Seat",
      "🔗 Share as Link",
      "🧩 Website Embed",
      "🔑 Use your own OpenAI API Key",
    ],
    dataSupport: [
      "📄 Documents",
      "🔗 Links",
      "🧩 Zapier Integration",
      "💿 1 Database Connection",
      "🛠️ 2 External API Integrations",
    ],
  },
];

function Pricing() {
  const { setPlan, plan, method } = usePlan((state) => state);
  const onSelectPlan = async (planName: planNameType) => {
    setPlan({ plan: planName, method });
    window.localStorage.setItem(
      "plan",
      JSON.stringify({ plan: planName, method: method })
    );
  };
  return (
    <section
      id="pricing"
      className="section relative flex justify-center items-center flex-col gap-20 p-4 py-[140px]"
    >
      <h1 className="text-[35px] md:text-[45px] font-bold">Pricing</h1>
      {/* select monthly or annual */}
      <div className="bg-[#373737] py-3 px-6 rounded-[10px] flex font-semibold gap-2">
        <div
          onClick={() => {
            setPlan({ plan, method: "monthly" });
          }}
          className={`px-4 py-1 cursor-pointer rounded-[10px] hover:shadow-lg hover:bg-[#19191988] transition-all
          ${method == "monthly" && "bg-[#191919] hover:bg-[#191919]"}`}
        >
          Monthly
        </div>
        <div
          onClick={() => {
            setPlan({ plan, method: "annual" });
          }}
          className={`flex cursor-pointer rounded-[10px] hover:shadow-lg hover:bg-[#19191988] transition-all
          ${method == "annual" && "bg-[#191919] hover:bg-[#191919]"} `}
        >
          <p className="px-4 py-1 ">Annual</p>
          <p className="px-4 py-1 rounded-[10px] bg-gradient-to-r from-[#7515EF] to-[#EC7D4E] ">
            Save 10%
          </p>
        </div>
      </div>

      {/* plans data */}
      <div className="flex flex-col xl:flex-row gap-10 w-[100%] mx-auto">
        {planData.map((planItem, index) => (
          <div
            key={index}
            className="border-gad-1 flex-1 flex flex-col justify-between gap-20 w-full"
          >
            <div className="flex flex-col gap-10 flex-[4]">
              <div className="flex flex-col gap-2 items-start">
                <div className="flex justify-between w-full items-center">
                  <p className="text-[#A595FD] font-semibold uppercase text-[16px] ">
                    {planItem.name}
                  </p>
                  {planItem.popular && (
                    <div className=" rounded-[20px] px-5 py-1 bg-gradient-to-r from-[#7515EF] to-[#EC7D4E] font-medium">
                      most popular
                    </div>
                  )}
                </div>
                <span className="text-[36px] font-bold text-white  ">
                  $
                  {method == "monthly"
                    ? planItem.price
                    : (
                        planItem.price * 12 -
                        planItem.price * 12 * (10 / 100)
                      ).toFixed()}
                  <span className="text-[#5A5A5A] ">
                    /{method == "monthly" ? "month" : "year"}
                  </span>
                </span>
              </div>
              <hr />
              <div className="flex flex-col gap-4 text-[18px] ">
                {planItem.features.map((planFeature, index) => (
                  <p key={index}>{planFeature}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-10 flex-grow-[1]">
              <div className="flex flex-col gap-4 text-[18px] ">
                <h2 className="text-[#A595FD] font-bold uppercase">
                  Supported Data sources
                </h2>
                {planItem.dataSupport.map((planDataSupport, index) => (
                  <p key={index}>{planDataSupport}</p>
                ))}
              </div>
              <div className=" flex flex-col gap-4 w-full">
                <Link
                  onClick={() =>
                    onSelectPlan(planItem.name.toLowerCase() as planNameType)
                  }
                  href={"/setup"}
                  target="_blank"
                  className="btn prim !w-full"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-gad-1 flex flex-col gap-6 flex-1 lg:w-[70%] ">
        <h1 className="text-[#969696] text-[35px] md:text-[42px] font-bold">
          Enterprise?
        </h1>
        <p className=" text-[#9D9D9D] text-[16px] md:text-[19px] max-w-[70%]">
          Please write to us at{" "}
          <Link
            href={"mailto:team@answerflowai.com"}
            className=" text-[#A595FD]"
          >
            team@answerflowai.com
          </Link>{" "}
          Our senior executives will reachout to you asap!
        </p>
      </div>
      <div className="border-gad-1 flex flex-col  items-center gap-4  ">
        <h1 className="text-[32px] leading-[32px] md:text-[48px] md:leading-[69px] font-bold text-center lg:max-w-[70%]">
          The Most Secure Way to Build Custom Bots for your Company
        </h1>
        <p className="text-[18px] font-normal md:text-[19px]  text-[#9D9D9D] lg:max-w-[60%] text-center pb-10">
          AnswerFlow AI is built with world-class security standards like SOC &
          GDPR. It runs on secure Microsoft Azure cloud and your data is never
          shared with LLM operators like OpenAI
        </p>

        <Link
          href={"https://cal.com/srivatsa"}
          target="_blank"
          className="btn sec"
        >
          Book a Demo
        </Link>
      </div>
      <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[100%] ">
        <Image src={"/div.png"} width={1200} height={51} alt="separator" />
      </div>
    </section>
  );
}

export default Pricing;
