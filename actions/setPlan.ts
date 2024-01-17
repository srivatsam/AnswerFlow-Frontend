"use server";
export const setPlan = async () => {
  try {
    const response = await fetch(
      `http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com/set_plan/4/2`,
      {
        method: "PUT",
      }
    );

    const responseData = await response.json();
    if (responseData.status == "error") {
      throw new Error(`${responseData.message}`);
    }
    return { success: "Set The Plan" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
