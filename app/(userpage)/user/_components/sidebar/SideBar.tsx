import { SideBarSections } from "./_components/SideBarSections";
import { Usage } from "./_components/Usage";

function SideBar() {
  return (
    <div className="flex flex-col justify-between min-w-[300px] ">
      {/* sections (features) */}
      <SideBarSections />

      {/* data usage */}
      <Usage />
    </div>
  );
}

export default SideBar;
