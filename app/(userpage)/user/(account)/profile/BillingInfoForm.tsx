"use client";
import React, { useState, useTransition } from "react";
import { CountryInput } from "@/app/(setup)/setup/_components/stepAComponents/CountryInput";
import { PhoneInput } from "@/app/(setup)/setup/_components/stepAComponents/PhoneInput";
import { toast } from "sonner";
import { updateBillingInfo } from "@/actions/updateBillingInfo";
type props = {
  billingInfo: billingInfoType;
};
type billingInfoType = {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  company: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  country: string | null;
  pinCode: string | null;
  phoneNumber: string | null;
  phoneCode: string | null;
};
export function BillingInfoForm({ billingInfo }: props) {
  const [isPending, startTransition] = useTransition();
  const [billingInfoState, setBillingInfoState] =
    useState<billingInfoType>(billingInfo);
  const updateBillingInfoField = (field: string, value: string) => {
    setBillingInfoState((prevBillingInfo) => ({
      ...prevBillingInfo,
      [field]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateBillingInfoField(name, value);
  };

  const formHandle = (e: FormData) => {
    startTransition(() => {
      const setPlanPromise = updateBillingInfo(e);
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Plan Seated Successfully",
        error: "Something Went Wrong",
      });
    });
  };
  return (
    <form action={formHandle} className="flex flex-col gap-6 ">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1 w-[230px]">
          <label htmlFor="firstName" className="font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={billingInfoState.firstName || ""}
            onChange={handleInputChange}
            required
            placeholder="Enter your first name"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 w-[230px]">
          <label htmlFor="lastName" className="font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={billingInfoState.lastName || ""}
            onChange={handleInputChange}
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
          disabled
          type="email"
          id="email"
          name="email"
          value={billingInfoState.email || ""}
          onChange={handleInputChange}
          required
          placeholder="Enter your work email"
          className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
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
          value={billingInfoState.company || ""}
          onChange={handleInputChange}
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
          value={billingInfoState.address || ""}
          onChange={handleInputChange}
          required
          placeholder="Apartment, Suite etc.."
          className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1 w-[230px]">
          <label htmlFor="city" className="font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={billingInfoState.city || ""}
            onChange={handleInputChange}
            required
            placeholder="Enter your city"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 w-[230px]">
          <label htmlFor="state" className="font-medium">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={billingInfoState.state || ""}
            onChange={handleInputChange}
            required
            placeholder="Enter state"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
          />
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-[230px]">
          <CountryInput
            handleInputChange={handleInputChange}
            country={billingInfoState.country}
          />
        </div>
        <div className="flex flex-col gap-1 w-[230px]">
          <label htmlFor="pinCode" className="font-medium">
            PinCode
          </label>
          <input
            type="text"
            id="pinCode"
            name="pinCode"
            value={billingInfoState.pinCode || ""}
            onChange={handleInputChange}
            required
            placeholder="Enter your PinCode"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
          />
        </div>
      </div>
      <PhoneInput
        handleInputChange={handleInputChange}
        phoneCode={billingInfoState.phoneCode}
        phoneNumber={billingInfoState.phoneNumber}
      />
      <div className="flex justify-center pt-10">
        <button
          type="submit"
          disabled={isPending}
          className={`btn sec ${isPending && "opacity-50 cursor-not-allowed "}`}
        >
          {isPending ? "Loading..." : "Save"}
        </button>
      </div>
    </form>
  );
}
