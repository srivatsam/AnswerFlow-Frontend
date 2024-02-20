"use client";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const shareBot = async (emails: string, botLink: string) => {
  const session = await auth();
  const response = await fetch(`${APIBACKEND}/notifications/invite_new_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emails: emails, //emails to send
      user_email: session?.user.email, //user email
      New_User_Invitation_Link: botLink, //bot shared link
    }),
  });

  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status == "error") {
    console.log(responseData.message);
    throw new Error(`${responseData.message}`);
  } else {
    return { success: "Invitation sent Successfully", data: responseData };
  }
};
