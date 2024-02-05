"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
        className="transition-all duration-1000 bg-[#161616c5] z-20 py-1 px-2 sm:px-4 sm:py-2 md:px-4 md:py-3 mx-6 rounded-lg backdrop-blur-md sticky top-5"
      >
        <div className="section flex justify-between items-center  fle-col ">
          <div className="pr-4">
            <Image src={"/logo.png"} width={210} height={100} alt="logo" />
          </div>
          <div className="flex gap-14">
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
          <div className="flex gap-4 items-center">
            <Link href={"/#pricing"} className="font-semibold">
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
