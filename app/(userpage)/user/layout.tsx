import { getUserPlan } from "@/actions/getUserPlan";
import NavBar from "./_components/navbar/NavBar";
import SideBar from "./_components/sidebar/SideBar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPlan = await getUserPlan();
  if (userPlan.userPlan) {
    return (
      <div className="relative flex flex-col gap-3 lg:gap-6 p-3 lg:p-6 w-full min-h-screen">
        <NavBar />
        <div className="flex gap-6 flex-1">
          <SideBar />
          {children}
        </div>
      </div>
    );
  }
  return null;
}
