import type { YourPlanType } from "@/types/plan";
import { planData } from "@/utils/constData";
import Image from "next/image";
import { useState } from "react";

type props = {
  planProps: YourPlanType | undefined;
  isPending: boolean;
};

export function PlanDetails({ planProps, isPending }: props) {
  const [toggle, setToggle] = useState(false);
  if (typeof planProps == "undefined") return null;

  const selectedPlan = planData.find(
    (plan) => plan.name === planProps.plan.toUpperCase()
  );
  if (typeof selectedPlan == "undefined") return null;

  return (
    <>
      <div
        onClick={() => setToggle((prev) => !prev)}
        className="block lg:hidden absolute top-8 right-6 z-20 cursor-pointer"
      >
        {toggle ? (
          <Image src={"/close.png"} alt="close" width={20} height={20} />
        ) : (
          <Image src={"/menu.png"} alt="close" width={26} height={26} />
        )}
      </div>
      <div
        className={`lg:py-20 py-6 bg-[#0B0B0B] absolute lg:relative w-screen lg:w-[43%] xl:w-[33%] ${
          toggle ? "block" : "hidden"
        } lg:block`}
      >
        <div className="flex flex-col justify-center gap-10 ">
          <h1 className="text-[32px] font-bold text-[#707070] px-6 lg:px-20">
            Plan Details
          </h1>
          <div className="flex justify-between px-6 lg:px-20">
            <div className="">
              <p className="text-[24px] font-medium">{selectedPlan?.name}</p>
              <p className="text-[#949494]">
                Duration:{" "}
                {planProps.method == "monthly" ? "1 months" : "12 months"}
              </p>
            </div>
            <div className="text-[24px]">
              $
              {planProps.method == "monthly"
                ? selectedPlan?.price
                : selectedPlan?.price * 12 -
                  (selectedPlan?.price * 12 * 10) / 100}
            </div>
          </div>

          <div className="flex flex-col gap-6 px-6 lg:px-20">
            <div className="flex flex-col gap-2 text-[16px] ">
              <h2 className="text-[#616161] font-bold uppercase">features</h2>
              <div className="flex flex-col gap-1 text-[16px]">
                {selectedPlan.features.map((planFeature, index) => (
                  <p key={index}>{planFeature}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-[16px] ">
              <h2 className="text-[#616161] font-bold uppercase">
                Supported Data sources
              </h2>
              <div className="flex flex-col gap-1  text-[16px]">
                {selectedPlan.dataSupport.map((planDataSupport, index) => (
                  <p key={index}>{planDataSupport}</p>
                ))}
              </div>
            </div>
          </div>
          <p className="bg-gray-600 w-full h-[1px]"></p>
          <div className="flex flex-col gap-2 text-[16px] px-6 lg:px-20">
            <div className="flex justify-between">
              <p className="">Subtotal</p>
              <p className="">
                $
                {planProps.method == "monthly"
                  ? selectedPlan?.price
                  : selectedPlan?.price * 12 -
                    (selectedPlan?.price * 12 * 10) / 100}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="">Tax</div>
              <div className="">$0</div>
            </div>
          </div>
          <p className="bg-gray-600 w-full h-[1px]"></p>
          <div className="flex justify-between px-6 lg:px-20">
            <div className="">
              <p className="">Total</p>
            </div>
            <div className="text-[32px] font-medium">
              ${" "}
              {planProps.method == "monthly"
                ? selectedPlan?.price
                : selectedPlan?.price * 12 -
                  (selectedPlan?.price * 12 * 10) / 100}
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-center px-6 lg:px-20 w-full">
            <button
              type="submit"
              disabled={isPending}
              className="btn sec !w-[100%]"
            >
              {isPending ? "Loading..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
