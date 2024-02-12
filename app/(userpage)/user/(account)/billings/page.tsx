import React from "react";
import { getBillings } from "@/actions/getBillings";
import { CancelPlan } from "../_components/CancelPlan";
import { UpgradePlan } from "../_components/UpgradePlan";
import Link from "next/link";
import { getUserPlan } from "@/actions/getUserPlan";

async function Billings() {
  const billings = await getBillings();
  const userPlan = await getUserPlan();
  return (
    <div className="flex flex-col bg-[#131313] rounded-[10px] gap-10 justify-start items-start w-[600px] py-8">
      <div className="w-full">
        <h1 className="text-[28px] font-bold px-12 py-4">Billing & Invoices</h1>
        <div className="flex w-full flex-col ">
          {billings &&
            billings.map((billing: any) => {
              const period_start: Date = new Date(billing["period_start"]);
              const period_end: Date = new Date(billing["period_end"]);
              const differenceInMillis: number =
                period_end.getTime() - period_start.getTime();
              const differenceInDays: number =
                differenceInMillis / (1000 * 60 * 60 * 24);
              let periodType: string = "Unknown";
              if (Math.abs(differenceInDays - 30) < 2) {
                periodType = "Monthly";
              } else if (Math.abs(differenceInDays - 365) < 2) {
                periodType = "Annual";
              }
              const date = new Date(billing["Date"]);
              const year = date.getFullYear() - 1;
              const month = date.getMonth();
              const day = date.getDate();
              const monthNames = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const formattedDate = `${monthNames[month]}' ${day}`;

              return (
                <Link
                  href={billing["invoice_pdf"]}
                  key={billing["Invoice ID"]}
                  className="flex flex-col gap-0 border-b-[1px] border-[#363636] px-12 py-6"
                >
                  <p className="text-[#5D5D5D] text-[14px]">{`#Order${billing["number"]}`}</p>
                  <div className="flex w-full justify-between text-[20px] font-medium">
                    <h3>${billing["subscription_type"]}</h3>
                    <p>{billing["Amount Due"]}</p>
                  </div>
                  <div className="flex w-full justify-between text-[#939393] text-[14px]">
                    <h3>{`${
                      billing["plan_name"] == "month" ? "Monthly" : "Annual"
                    } Subscription  ${billing["plan_name"]}`}</h3>
                    <p>{formattedDate}</p>
                  </div>
                </Link>
              );
            })}
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
          <UpgradePlan userPlan={userPlan} />
        </div>
      </div>
    </div>
  );
}

export default Billings;
