import React from "react";
import { $Enums } from "@prisma/client";

type props = {
  userInfoState: userInfoType;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
type userInfoType = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: $Enums.UserRole;
  openai_api_key: string | null;
  plan_id: string | null;
};

export function UserInfoForm({ userInfoState, handleInputChange }: props) {
  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1 w-[230px]">
          <label htmlFor="firstName" className="font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userInfoState.firstName || ""}
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
            value={userInfoState.lastName || ""}
            onChange={handleInputChange}
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
        <div className="bg-[#424242] w-[240px] text-[12px] py-4 px-8 rounded-md absolute text-center bottom-[10%] left-[130%] translate-x-[-50%] invisible  group-hover:visible">
          You can change it from settings
        </div>
        <input
          disabled
          type="email"
          id="email"
          name="email"
          value={userInfoState.email || ""}
          onChange={handleInputChange}
          required
          placeholder="Enter your work email"
          className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
        />
      </div>
    </>
  );
}
