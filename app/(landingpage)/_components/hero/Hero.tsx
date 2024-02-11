"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative section flex gap-14 md:gap-24 items-center flex-col py-6 sm:py-16 md:py-10 md:pb-[200px] ">
        <div className="flex gap-14 md:gap-18 items-center flex-col">
          <div className="text-center md:max-w-[85%] mx-auto flex gap-8 items-center flex-col">
            <m.h2
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
                delay: 0.7,
              }}
              className="text-[44px] leading-[44px] md:text-[60px] md:leading-[60px] font-bold "
            >
              Just Chat with your Data
            </m.h2>
            <m.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
                delay: 1,
              }}
              className="text-[18px] font-normal leading-[24px] md:text-[22px] md:leading-[32px]"
            >
              Affordable way to build CustomGPT Bots, trained on your Data.{" "}
              <span className="font-medium"></span>,
              <span className="text-[#EC7D4E] font-medium">
                Using your own OpenAI API Key!
              </span>
            </m.p>
          </div>
          <div className="">
            <m.div
              initial={{ filter: "blur(8px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
                delay: 1.3,
                staggerChildren: 1,
              }}
              className="flex flex-col justify-center items-center gap-1"
            >
              <Link
                href={"https://cal.com/srivatsa"}
                target="_blank"
                className="w-full h-full flex justify-center items-center btn sec"
              >
                Get Started
              </Link>
              <p className="text-[#717171] text-[16px]">Cancel anytime</p>
              <p className="text-[#717171] text-[16px]">
                100+ customers are saving on AI Bots
              </p>
            </m.div>
          </div>
        </div>
        <div className=" flex justify-center gap-3 flex-col lg:flex-row md:gap-10">
          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 90,
              delay: 1.7,
            }}
            className="bg-[#1B1B1B] px-4 md:px-12 py-3 rounded-[50px] text-center"
          >
            ✅ Unlimited Chats
          </m.div>
          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 90,
              delay: 1.8,
            }}
            className="bg-[#1B1B1B] px-4 md:px-12 py-3 rounded-[50px] text-center"
          >
            🔐 Secure
          </m.div>
          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 90,
              delay: 1.9,
            }}
            className="bg-[#1B1B1B] px-4 md:px-12 py-3 rounded-[50px] text-center"
          >
            🧩 Biggest Library of Connectors
          </m.div>
        </div>
        <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[100%] ">
          <Image src={"/div.png"} width={1200} height={51} alt="separator" />
        </div>
      </section>
    </LazyMotion>
  );
}

export default Hero;
