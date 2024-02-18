"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
export const getUser = async () => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";

  const response = await fetch(`${APIBACKEND}/get_user/${userId}`, {
    method: "GET",
    next: { tags: ["user"] },
  });
  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status != "success") {
    console.log(responseData.message);
  }
  if (responseData !== null) {
    return responseData.user;
  } else {
    return undefined;
  }
};
