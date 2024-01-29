import { activeSectionType, sectionType } from "@/types/activeSection";
import { create } from "zustand";

const activeStepFromLocal =
  typeof window !== "undefined" &&
  (localStorage.getItem("activeSection") as activeSectionType);

export const useActiveSection = create<sectionType>((set) => ({
  activeSection: activeStepFromLocal || "",
  setActiveSection: (value) => {
    localStorage.setItem("activeSection", value);
    set({ activeSection: value });
  },
}));
