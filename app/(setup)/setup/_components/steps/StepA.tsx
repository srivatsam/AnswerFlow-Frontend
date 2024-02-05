import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { setPlan } from "@/actions/setPlan";
import type { YourPlanType } from "@/types/plan";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { PlanDetails } from "../stepAComponents/PlanDetails";
import { CountryInput } from "../stepAComponents/CountryInput";
import { PhoneInput } from "../stepAComponents/PhoneInput";
import { useSession } from "next-auth/react";

type props = { handleNext: () => void };

function StepA({ handleNext }: props) {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const route = useRouter();
  const [planFromLocal, setPlanFromLocal] = useState<YourPlanType>();
  const [isPending, startTransition] = useTransition();

  const fetchPlanFromLocalStorage = useCallback(() => {
    try {
      const storedPlan = localStorage.getItem("plan");
      if (storedPlan) {
        const parsedPlan: YourPlanType = JSON.parse(storedPlan);
        setPlanFromLocal(parsedPlan);
      } else {
        toast.info("You Have To Select a Plan");
        route.push("/#pricing");
      }
    } catch (error) {
      toast.info("You Have To Select a Plan");
      route.push("/#pricing");
      console.error("Error while retrieving plan from local storage:", error);
    }
  }, [route]);

  useEffect(() => {
    setEmail(session.data?.user.email || "");
    // setLastName(session.data?.user.name?.split(" ")[1] || "");
    // setFirstName(session.data?.user.name?.split(" ")[0] || "");
  }, [session]);
  useEffect(() => {
    fetchPlanFromLocalStorage();
  }, [fetchPlanFromLocalStorage]);

  const onPlanSubmit = useCallback(
    (formData: FormData) => {
      startTransition(() => {
        const setPlanPromise = setPlan(
          formData,
          planFromLocal?.plan as string
        ).then((response) => {
          if (response) route.push(response.url);
          // handleNext();
        });
        toast.promise(setPlanPromise, {
          loading: "Loading...",
          success: "Plan Seated Successfully",
          error: "Something Went Wrong",
        });
      });
    },
    [startTransition, handleNext, planFromLocal?.plan]
  );

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      action={onPlanSubmit}
      className="flex justify-center items-center w-full"
    >
      {/* checkout form */}
      <div className="flex-1 flex flex-col gap-10 justify-start items-start p-20 ">
        <h1 className="text-[40px] leading-[74px] font-bold">
          Continue Checkout
        </h1>
        <div className="flex flex-col gap-6 ">
          <div className=""></div>
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName || ""}
                autoComplete="first name"
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Enter your first name"
                className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="last name"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Enter your last name"
                className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 relative group">
            <label htmlFor="email" className="font-medium">
              Email Address
            </label>
            <div className="bg-[#424242] w-[240px] text-[12px] py-4 px-8 rounded-md absolute text-center bottom-[110%] left-[10%] translate-x-[-50%] invisible  group-hover:visible">
              You can change it from settings
            </div>
            <input
              disabled
              type="email"
              id="email"
              name="email"
              value={email || ""}
              required
              placeholder="Enter your work email"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40 cursor-not-allowed"
            />
          </div>
          <h1 className="text-[#777777] text-[24px] font-bold">Billing Info</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="company" className="font-medium">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="company"
              required
              placeholder="Enter your company name"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="font-medium">
              Address Line 1
            </label>
            <input
              type="text"
              id="address"
              name="address"
              autoComplete="address"
              required
              placeholder="Apartment, Suite etc.."
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
            />
          </div>
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="font-medium">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                autoComplete="city"
                required
                placeholder="Enter your city"
                className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="state" className="font-medium">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                autoComplete="state"
                required
                placeholder="Enter state"
                className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <CountryInput />
            <div className="flex flex-col gap-1">
              <label htmlFor="pinCode" className="font-medium">
                PinCode
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                autoComplete="pinCode"
                required
                placeholder="Enter your PinCode"
                className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
              />
            </div>
          </div>
          <PhoneInput />
        </div>
      </div>
      {/* plan details  */}
      <PlanDetails planProps={planFromLocal} isPending={isPending} />
    </motion.form>
  );
}

export default React.memo(StepA);
