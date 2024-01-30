"use client";
import { updatePlan } from "@/actions/updatePlan";
import { usePlan } from "@/hooks/use-plan-hook";
import { planNameType } from "@/types/plan";
import { planData } from "@/utils/constData";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

function Upgrade() {
  const [isPending, startTransition] = useTransition();
  const [toggle, setToggle] = useState(false);
  const { setPlan, plan, method } = usePlan((state) => state);
  const onSelectPlan = async (planName: planNameType) => {
    setPlan({ plan: planName, method });
    window.localStorage.setItem(
      "plan",
      JSON.stringify({ plan: planName, method: method })
    );
    onPlanSubmit(planName);
  };
  const onPlanSubmit = (planName: string) => {
    startTransition(() => {
      const setPlanPromise = updatePlan(planName);
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Plan Seated Successfully",
        error: "Something Went Wrong",
      });
    });
  };
  return (
    <>
      <div
        onClick={() => setToggle(true)}
        className="flex justify-between items-center gap-10 py-2 px-4 bg-[#1B1B1B] rounded-[10px] cursor-pointer relative"
      >
        Upgrade ✨
      </div>
      {toggle && (
        <div className="absolute top-0 left-0 w-full  flex justify-center items-center z-[999] bg-black/40 backdrop-blur-sm ">
          <section
            id="pricing"
            className="section relative flex justify-center items-center flex-col gap-10 p-4"
          >
            <h1 className="text-[35px] md:text-[45px] font-bold">
              Choose Plan
            </h1>
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
                      <button
                        onClick={() =>
                          onSelectPlan(
                            planItem.name.toLowerCase() as planNameType
                          )
                        }
                        className="btn prim !w-full"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div
            onClick={() => setToggle(false)}
            className="absolute right-6 top-6 cursor-pointer"
          >
            <Image
              src={"/Close.png"}
              width={30}
              height={30}
              alt="close image"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Upgrade;
