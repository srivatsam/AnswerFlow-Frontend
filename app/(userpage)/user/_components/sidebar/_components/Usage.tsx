import { getUserUsage } from "@/actions/getUsage";
import { UsageComponent } from "./UsageComponent";

export async function Usage() {
  const userUsage = await getUserUsage();

  return <UsageComponent userUsage={userUsage} />;
}
