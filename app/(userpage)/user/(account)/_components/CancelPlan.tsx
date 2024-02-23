"use client";
import { cancelPlan } from "@/actions/cancelPlan";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function CancelPlan() {
  const [cancelPopUp, setCancelPopUp] = useState(false);
  const cancelConfirm = "CANCEL/PLAN";
  const [cancelMassage, setCancelMassage] = useState("");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onPlanCancel = () => {
    startTransition(async () => {
      const cancelPlanPromise = await cancelPlan();
      if (cancelPlanPromise.success) {
        router.push("/payment");
        toast.success(cancelPlanPromise.success);
      }
      if (cancelPlanPromise.error) {
        toast.error(cancelPlanPromise.error);
      }
    });
  };
  useEffect(() => {
    if (isPending) {
      toast.loading("Loading ...!");
    }
  }, [isPending]);
  const popupDelete = () => {
    setCancelPopUp(true);
  };
  return (
    <>
      <button
        disabled={isPending}
        onClick={popupDelete}
        className={`text-[15px] text-[#A2A2A2] bg-[#232323] rounded-[10px] w-fit px-8 py-3 ${
          isPending && "cursor-not-allowed opacity-40"
        }`}
      >
        Cancel Subscription
      </button>
      {cancelPopUp && (
        <div className="fixed z-50 inset-0 overflow-hidden backdrop-blur-3xl flex justify-center items-center ">
          <div className="flex flex-col justify-start items-start gap-4 px-12 py-8 bg-black/60 rounded-[10px]">
            <label htmlFor="deleteConfirm" className="select-none">
              To Continue <br />
              Type <span className="font-bold">{cancelConfirm}</span> to
              confirm.
            </label>
            <input
              type="text"
              name="deleteConfirm"
              id="deleteConfirm"
              value={cancelMassage}
              onChange={(e) => setCancelMassage(e.target.value)}
              placeholder={cancelConfirm}
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
            />
            <div className=" flex justify-between items-center w-full">
              <button
                disabled={cancelMassage !== cancelConfirm}
                onClick={(e) => {
                  e.preventDefault();
                  onPlanCancel();
                }}
                className={`${
                  cancelMassage !== cancelConfirm &&
                  "opacity-40 cursor-not-allowed"
                } bg-[#fa5555] rounded-[10px] py-4 px-10 w-fit`}
              >
                {isPending ? "Cancel Plan..." : "Cancel Plan"}
              </button>
              <button
                className="bg-[#232323] rounded-[10px] py-4 px-10 w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  setCancelPopUp(false);
                }}
              >
                cancel
              </button>
            </div>
          </div>
          <div
            onClick={() => setCancelPopUp(false)}
            className="fixed z-[-10] inset-0 cursor-pointer"
          />
        </div>
      )}
    </>
  );
}
