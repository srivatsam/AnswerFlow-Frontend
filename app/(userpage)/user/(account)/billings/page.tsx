import { getBillings } from "@/actions/getBillings";
import React from "react";
import { CancelPlan } from "../_components/CancelPlan";

async function Billings() {
  const billings = await getBillings();
  return (
    <div className="flex flex-col bg-[#131313] rounded-[10px] gap-10 justify-start items-start w-[600px] py-8">
      <div className="w-full">
        <h1 className="text-[28px] font-bold px-12 py-4">Billing & Invoices</h1>
        <div className="flex w-full flex-col ">
          <div className="flex flex-col gap-0 border-b-[1px] border-[#363636] px-12 py-6">
            <p className="text-[#5D5D5D] text-[14px]">#Order123</p>
            <div className="flex w-full justify-between text-[20px] font-medium">
              <h3>Starter plan</h3>
              <p>$99</p>
            </div>
            <div className="flex w-full justify-between text-[#939393] text-[14px]">
              <h3>Monthly Subscription</h3>
              <p>Dec’ 23</p>
            </div>
          </div>
          <div className="flex flex-col gap-0 border-b-[1px] border-[#363636] px-12 py-6">
            <p className="text-[#5D5D5D] text-[14px]">#Order123</p>
            <div className="flex w-full justify-between text-[20px] font-medium">
              <h3>Starter plan</h3>
              <p>$99</p>
            </div>
            <div className="flex w-full justify-between text-[#939393] text-[14px]">
              <h3>Monthly Subscription</h3>
              <p>Dec’ 23</p>
            </div>
          </div>
          <div className="flex flex-col gap-0 border-b-[1px] border-[#363636] px-12 py-6">
            <p className="text-[#5D5D5D] text-[14px]">#Order123</p>
            <div className="flex w-full justify-between text-[20px] font-medium">
              <h3>Starter plan</h3>
              <p>$99</p>
            </div>
            <div className="flex w-full justify-between text-[#939393] text-[14px]">
              <h3>Monthly Subscription</h3>
              <p>Dec’ 23</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-10 px-12 py-4">
        <h2 className="text-[24px] font-bold text-[#777777] ">
          Manage Subscription
        </h2>
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-[10px] p-6 bg-[#373737] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] font-medium">Cancel Subscription</h3>
              <p className="text-[14px] text-[#8A8A8A]">
                You will loose access to the account data and bots, this action
                cannot be undone.
              </p>
            </div>
            <CancelPlan />
          </div>
          <div className="rounded-[10px] p-6 bg-[#373737] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-[18px] font-medium">Cancel Subscription</h3>
              <p className="text-[14px] text-[#30B616]">
                Enjoy bigger knowledgebase & number of bots
              </p>
            </div>
            <button className="text-[15px] text-[#A2A2A2] bg-[#232323] rounded-[10px] w-fit px-8 py-3 ">
              Upgrade ($299/month)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billings;
