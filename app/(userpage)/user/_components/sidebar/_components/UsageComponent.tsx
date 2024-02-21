"use client";
import React from "react";

export function UsageComponent({ userUsage }: { userUsage: any }) {
  const currentUsage = userUsage.usage.docsSize.split(" ")[0];
  const percentage = (currentUsage / userUsage.limits.docsSize) * 100;

  const currentBots = userUsage.usage.numBots;
  const percentBots = (currentBots / userUsage.limits.botsNum) * 100;
  return (
    <>
      <div className="rounded-[10px] bg-[#161616] p-4 lg:p-6 flex flex-col gap-4 lg:gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-[25px]">Data Usage</h1>
          <p className="text-[#727272] text-[14px]">
            Total uploaded data as data sources
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full bg-[#2B2B2B] rounded-[10px] h-[10px] overflow-hidden">
            <p
              className="h-full transition-all bg-gradient-to-r from-[#7515EF] to-[#EC7D4E] rounded-[10px]"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[#727272] text-[14px] font-mono">
            {percentage.toFixed()}% of {userUsage.limits.docsSize}MB used
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full bg-[#2B2B2B] rounded-[10px] h-[10px] overflow-hidden">
            <p
              className="h-full transition-all bg-gradient-to-r from-[#7515EF] to-[#EC7D4E] rounded-[10px]"
              style={{ width: `${percentBots}%` }}
            />
          </div>
          <p className="text-[#727272] text-[14px] font-mono">
            {currentBots.toFixed()} of {userUsage.limits.botsNum} Bots
          </p>
        </div>
      </div>
    </>
  );
}
