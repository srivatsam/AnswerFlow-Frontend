"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Header() {
  const [toggle, setToggle] = useState(false);
  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
        className="transition-all duration-1000 bg-[#161616c5] z-20 py-3 px-2 sm:px-4 sm:py-2 md:px-4 md:py-3 mx-2 md:mx-6 rounded-lg backdrop-blur-md sticky top-5"
      >
        <div className="section flex justify-between items-center fle-col !max-w-full  xl:!max-w-[1280px] gap-2">
          <div className="">
            <Image
              src={"/logo.png"}
              width={210}
              height={100}
              alt="logo"
              className="w-[180px] md:w-full"
            />
          </div>
          <div
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            className="flex md:hidden w-[20px] h-[20px] cursor-pointer"
          >
            <Image src={"/menu2.png"} width={40} height={40} alt="menu " />
          </div>
          <div
            className={` ${
              toggle ? "flex" : "hidden"
            } md:hidden absolute top-[120%] left-0 w-full rounded-[10px] h-[88vh] duration-1000 bg-[#161616fb] z-20 backdrop-blur-xl transition-all p-4  flex-col justify-between`}
          >
            <div className="flex flex-col gap-8 text-[21px]">
              <div className="font-semibold cursor-pointer flex gap-2 items-center">
                <p
                  onClick={() => {
                    setToggle((prev) => !prev);
                  }}
                >
                  Live Demos
                </p>
                <Image
                  src={"/Arrow.png"}
                  width={18}
                  height={18}
                  alt="downArrow image"
                />
              </div>
              <Link
                onClick={() => {
                  setToggle((prev) => !prev);
                }}
                href={"/#pricing"}
                className="font-semibold"
              >
                Pricing
              </Link>
              <Link
                onClick={() => {
                  setToggle((prev) => !prev);
                }}
                href={"https://blog.answerflowai.com/"}
                target="_blank"
                className="font-semibold"
              >
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-4 text-[21px]">
              <Link
                onClick={() => {
                  setToggle((prev) => !prev);
                }}
                href={"/login"}
                className="font-semibold btn prim"
              >
                Login
              </Link>
              <Link
                onClick={() => {
                  setToggle((prev) => !prev);
                }}
                href={"/#pricing"}
                className="btn sec"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="hidden md:flex gap-8 ">
            <div className="font-semibold cursor-pointer flex gap-2 items-center">
              <p>Usecases</p>
              <Image
                src={"/Arrow.png"}
                width={18}
                height={18}
                alt="downArrow image"
              />
            </div>
            <Link href={"/#pricing"} className="font-semibold">
              Pricing
            </Link>
            <Link
              href={"https://blog.answerflowai.com/"}
              target="_blank"
              className="font-semibold"
            >
              Blog
            </Link>
          </div>
          <div className="hidden md:flex  gap-4 items-center">
            <Link href={"/login"} className="font-semibold">
              Login
            </Link>
            <Link href={"/#pricing"} className="btn prim">
              Get Started
            </Link>
          </div>
        </div>
      </m.header>
    </LazyMotion>
  );
}

export default Header;
