"use server";
export const createBot = async (formData: FormData) => {
  try {
    const response = await fetch(
      `http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com/create_bot/4`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("botName"),
          system_prompt: formData.get("botPurpose"),
          tone: formData.get("toneOfVoice"),
        }),
      }
    );

    const responseData = await response.json();
    // console.log(responseData);
    if (responseData.status == "error") {
      throw new Error(`${responseData.message}`);
    }
    return { success: "Bot Created" };
  } catch (error) {
    return { error: "Some Thing Sent Wrong" };
  }
};
