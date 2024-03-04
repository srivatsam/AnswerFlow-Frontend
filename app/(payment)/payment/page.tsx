"use client";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

import { setPlan } from "@/actions/setPlan";
import type { YourPlanType } from "@/types/plan";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { PlanDetails } from "./_components/PlanDetails";
import { CountryInput } from "./_components/CountryInput";
import { PhoneInput } from "./_components/PhoneInput";
import { getUserData } from "@/actions/getUserData";

export default function Page() {
  const [user, setUser] = useState<userType>();
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserData();
      if (user) setUser(user);
    };
    getUser();
  }, []);
  const [lastName, setLastName] = useState(user?.firstName || "");
  const [firstName, setFirstName] = useState(user?.lastName || "");
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
    fetchPlanFromLocalStorage();
  }, [fetchPlanFromLocalStorage]);

  const onPlanSubmit = (formData: FormData) => {
    startTransition(async () => {
      const setPlanPromise = await setPlan(formData, planFromLocal!);
      if (setPlanPromise.success) {
        route.push(setPlanPromise.url);
        toast.success("Go To Payment");
      }
      if (setPlanPromise.error) {
        route.push(setPlanPromise.error);
        toast.success(setPlanPromise.error);
      }
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      action={onPlanSubmit}
      className="flex justify-center items-stretch w-full"
    >
      {/* checkout form */}
      <div className="flex-1 flex flex-col gap-6 lg:gap-10 justify-start items-start p-4 lg:p-20">
        <h1 className="text-[32px] lg:text-[40px] font-bold">
          Continue Checkout
        </h1>
        <div className="flex flex-col gap-6 w-full lg:w-fit">
          <div className=""></div>
          <div className="flex flex-col xl:flex-row justify-between gap-4">
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
                className="bg-[#232323] rounded-[10px] p-4 lg:px-8 lg:py-4 w-full outline-none"
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
                className="bg-[#232323] rounded-[10px] p-4 lg:px-8 lg:py-4 w-full outline-none"
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
              type="email"
              id="email"
              name="email"
              value={user?.email || ""}
              required
              placeholder="Enter your work email"
              className="bg-[#232323] rounded-[10px] p-4 lg:px-8 lg:py-4 w-full outline-none opacity-40 cursor-not-allowed"
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
              className="bg-[#232323] rounded-[10px] p-4 lg:px-8 lg:py-4 w-full outline-none"
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
              className="bg-[#232323] rounded-[10px] p-4 lg:px-8 lg:py-4 w-full outline-none"
            />
          </div>
          <div className="flex flex-col xl:flex-row  justify-between gap-4">
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
                className="bg-[#232323] rounded-[10px] p-4 lg:px-8 lg:py-4 w-full outline-none"
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
                className="bg-[#232323] rounded-[10px] p-4 lg:px-8 lg:py-4 w-full outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col xl:flex-row justify-between gap-4">
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
                className="bg-[#232323] rounded-[10px] p-4 lg:px-8 lg:py-4 w-full outline-none"
              />
            </div>
          </div>
          <PhoneInput />
        </div>
        <div className="w-full">
          <button
            type="submit"
            disabled={isPending}
            className="btn sec !w-[100%]"
          >
            {isPending ? "Loading..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
      {/* plan details  */}
      <PlanDetails planProps={planFromLocal} isPending={isPending} />
    </motion.form>
  );
}
