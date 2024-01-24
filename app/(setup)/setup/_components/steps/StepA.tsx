import { useEffect, useState, useTransition } from "react";

import { setPlan } from "@/actions/setPlan";
import { YourPlanType } from "@/types/plan";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PlanDetails } from "../stepAComponents/PlanDetails";
import { CountryInput } from "../stepAComponents/CountryInput";
import { PhoneInput } from "../stepAComponents/PhoneInput";

type props = { handleNext: () => void };

function StepA({ handleNext }: props) {
  const route = useRouter();
  const [planFromLocal, setPlanFromLocal] = useState<YourPlanType>();
  const [isPending, startTransition] = useTransition();

  // retrieving plan from local storage
  useEffect(() => {
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

  const onPlanSubmit = (formData: FormData) => {
    startTransition(() => {
      const setPlanPromise = setPlan(
        formData,
        planFromLocal?.plan as string
      ).then((response) => {
        handleNext();
      });
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Plan Seated Successfully",
        error: "Something Went Wrong",
      });
    });
  };
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
                required
                placeholder="Enter your last name"
                className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your work email"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
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
                required
                placeholder="Enter your PinCode"
                className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
              />
            </div>
          </div>
          <PhoneInput />
          {/* <div className="flex flex-col gap-1">
            <label htmlFor="phoneNumber" className="font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              required
              placeholder="Enter your phone number"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
            />
          </div> */}
        </div>
      </div>
      {/* plan details  */}
      <PlanDetails planProps={planFromLocal} isPending={isPending} />
      {/* <div className="min-w-[33%] bg-[#0B0B0B] flex flex-col justify-center gap-8 h-screen fixed top-0 right-0">
        <h1 className="text-[32px] font-bold text-[#707070] px-20">
          Plan Details
        </h1>
        <div className="flex justify-between px-20">
          <div className="">
            <p className="text-[24px] font-medium">{planFromLocal?.plan}</p>
            <p className="text-[#949494]">
              Duration:{" "}
              {planFromLocal?.method == "monthly" ? "1 months" : "12 months"}
            </p>
          </div>
          <div className="text-[24px]">
            $
            {planFromLocal?.plan == "basic"
              ? planFromLocal?.method == "monthly"
                ? "19"
                : "205"
              : ""}
            {planFromLocal?.plan == "starter"
              ? planFromLocal?.method == "monthly"
                ? "99"
                : "1069"
              : ""}
            {planFromLocal?.plan == "pro"
              ? planFromLocal?.method == "monthly"
                ? "299"
                : "3229"
              : ""}
          </div>
        </div>
        <div className="flex flex-col gap-6 px-20">
          <div className="flex flex-col gap-2 text-[16px] ">
            <h2 className="text-[#A595FD] font-bold uppercase">features</h2>
            <div className="flex flex-col gap-1 pl-10 text-[16px]">
              {planFromLocal?.plan == "basic" && (
                <>
                  <p> Unlimited Chats</p>
                  <p> 1 Bot</p>
                  <p> 50 MB Knowledge base</p>
                  <p> 1 Seat</p>
                  <p> Share as Link</p>
                  <p> Use your own OpenAI API Key</p>
                </>
              )}
              {planFromLocal?.plan == "starter" && (
                <>
                  <p> Unlimited Chats</p>
                  <p> 1 Bot</p>
                  <p> 50 MB Knowledge base</p>
                  <p> 1 Seat</p>
                  <p> Share as Link</p>
                  <p> Use your own OpenAI API Key</p>
                </>
              )}
              {planFromLocal?.plan == "pro" && (
                <>
                  <p> Unlimited Chats</p>
                  <p> 1 Bot</p>
                  <p> 50 MB Knowledge base</p>
                  <p> 1 Seat</p>
                  <p> Share as Link</p>
                  <p> Use your own OpenAI API Key</p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-[16px] ">
            <h2 className="text-[#A595FD] font-bold uppercase">
              Supported Data sources
            </h2>
            <div className="flex flex-col gap-1 pl-10 text-[16px]">
              {planFromLocal?.plan == "basic" && (
                <>
                  <p> Documents</p>
                  <p> inks</p>
                </>
              )}
              {planFromLocal?.plan == "starter" && (
                <>
                  <p> Documents</p>
                  <p> Links</p>
                  <p> Zapier Integration</p>
                </>
              )}
              {planFromLocal?.plan == "pro" && (
                <>
                  <p> Documents</p>
                  <p> Links</p>
                  <p> Zapier Integration</p>
                  <p> 1 Database Connection</p>
                  <p> 2 External API Integrations</p>
                </>
              )}
            </div>
          </div>
        </div>
        <p className="bg-gray-600 w-full h-[1px]"></p>
        <div className="flex flex-col gap-2 text-[16px] px-20">
          <div className="flex justify-between">
            <p className="">Subtotal</p>
            <p className="">
              $
              {planFromLocal?.plan == "basic"
                ? planFromLocal?.method == "monthly"
                  ? "19"
                  : "205"
                : ""}
              {planFromLocal?.plan == "starter"
                ? planFromLocal?.method == "monthly"
                  ? "99"
                  : "1069"
                : ""}
              {planFromLocal?.plan == "pro"
                ? planFromLocal?.method == "monthly"
                  ? "299"
                  : "3229"
                : ""}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="">Tax</div>
            <div className="">$0</div>
          </div>
        </div>
        <p className="bg-gray-600 w-full h-[1px]"></p>
        <div className="flex justify-between px-20">
          <div className="">
            <p className="">Total</p>
          </div>
          <div className="text-[32px] font-medium">
            $
            {planFromLocal?.plan == "basic"
              ? planFromLocal?.method == "monthly"
                ? "19"
                : "205"
              : ""}
            {planFromLocal?.plan == "starter"
              ? planFromLocal?.method == "monthly"
                ? "99"
                : "1069"
              : ""}
            {planFromLocal?.plan == "pro"
              ? planFromLocal?.method == "monthly"
                ? "299"
                : "3229"
              : ""}
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center px-20">
          <button
            type="submit"
            disabled={isPending}
            className="btn sec !w-[80%]"
          >
            {isPending ? "Loading..." : "Proceed to Payment"}
          </button>
        </div>
      </div> */}
    </motion.form>
  );
}

export default StepA;
