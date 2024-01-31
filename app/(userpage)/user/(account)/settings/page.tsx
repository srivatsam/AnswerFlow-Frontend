import React from "react";
import { auth } from "@/auth";

import { getUserById } from "@/utils/dbFunctions/user";
import UserDataForm from "../../_components/account/UserDataForm";

async function page() {
  const session = await auth();
  const exitUser = await getUserById(session?.user.id as string);
  try {
    console.log(exitUser);
    if (exitUser) {
      return (
        <div className="flex flex-col gap-10">
          <UserDataForm userData={exitUser} />
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export default page;
