"use client";
import React, { useState, useTransition } from "react";
import { useSession } from "next-auth/react";

import { UserInfoForm } from "./UserInfoForm";
import { BillingInfoForm } from "./BillingInfoForm";
import { UserImage } from "./UserImage";
import { UploadImage } from "./UploadImage";

import { updateInfo } from "@/actions/updateBillingInfo";

import { EdgeStoreProvider } from "@/lib/edgestore";

import { $Enums } from "@prisma/client";
import { toast } from "sonner";

type props = {
  billingInfo: billingInfoType;
  userInfo: userInfoType;
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

export function ProfileForm({ billingInfo, userInfo }: props) {
  const session = useSession();
  const [imageUrl, setImageUrl] = useState(userInfo.image);
  const [isPending, startTransition] = useTransition();

  const [billingInfoState, setBillingInfoState] =
    useState<billingInfoType>(billingInfo);
  const [userInfoState, setUserInfoState] = useState<userInfoType>(userInfo);

  const updateBillingInfoField = (field: string, value: string) => {
    setBillingInfoState((prevBillingInfo) => ({
      ...prevBillingInfo,
      [field]: value,
    }));
    setUserInfoState((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateBillingInfoField(name, value);
  };

  const formHandle = (e: FormData) => {
    if (imageUrl) {
      e.append("image", imageUrl);
    }
    startTransition(() => {
      const setPlanPromise = updateInfo(e);
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Profile Info Updated Successfully",
        error: (error) => `${error.message}`,
      });
    });
  };
  return (
    <form action={formHandle} className="flex flex-col gap-6 ">
      <EdgeStoreProvider>
        {imageUrl ? (
          <UserImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
        ) : (
          <UploadImage setImageUrl={setImageUrl} imageUrl={imageUrl} />
        )}
        <UserInfoForm
          userInfoState={userInfoState}
          handleInputChange={handleInputChange}
        />
        <BillingInfoForm
          billingInfoState={billingInfoState}
          handleInputChange={handleInputChange}
        />
        <div className="flex justify-center pt-10">
          <button
            type="submit"
            disabled={isPending}
            className={`btn sec ${
              isPending && "opacity-50 cursor-not-allowed "
            }`}
          >
            {isPending ? "Loading..." : "Save"}
          </button>
        </div>
      </EdgeStoreProvider>
    </form>
  );
}
