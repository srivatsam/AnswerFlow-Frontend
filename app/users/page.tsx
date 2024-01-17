import { auth } from "@/auth";
import React from "react";

async function page() {
  const session = await auth();
  console.log(session?.user?.id);
  return <div>asd</div>;
}

export default page;
