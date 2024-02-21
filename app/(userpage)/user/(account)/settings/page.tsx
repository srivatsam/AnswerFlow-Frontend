import React from "react";
import { auth } from "@/auth";

import { getUserById } from "@/utils/dbFunctions/user";
import { UserDataForm } from "../_components/UserDataForm";

async function page() {
  const session = await auth();
  const exitUser = await getUserById(session?.user.id as string);
  try {
    if (exitUser) {
      return (
        <div className="flex flex-col gap-10 w-full lg:w-[600px]">
          <UserDataForm userData={exitUser} />
        </div>
      );
    }
    <div className="flex flex-col gap-10 w-[600px]">user not found</div>;
  } catch (error) {
    console.log(error);
  }
}

export default page;
