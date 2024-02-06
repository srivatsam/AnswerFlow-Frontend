"use client";

import { CountryInput } from "@/app/(payment)/payment/_components/CountryInput";
import { PhoneInput } from "@/app/(payment)/payment/_components/PhoneInput";

type props = {
  billingInfoState: billingInfoType;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
type billingInfoType = {
  id: string;
  userId: string;
  company: string | null;
  address: string | null;
  state: string | null;
  city: string | null;
  country: string | null;
  pinCode: string | null;
  phoneNumber: string | null;
  phoneCode: string | null;
};

export function BillingInfoForm({
  billingInfoState,
  handleInputChange,
}: props) {
  return (
    <>
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
    </>
  );
}
