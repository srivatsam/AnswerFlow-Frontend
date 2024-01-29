import { activeSectionType, sectionType } from "@/types/activeSection";
import { create } from "zustand";

const activeSection =
  typeof window !== "undefined" &&
  (localStorage.getItem("activeSection") as activeSectionType);

export const useActiveSection = create<sectionType>((set) => ({
  activeSection: activeSection || "",
  setActiveSection: (value) => {
    localStorage.setItem("activeSection", value);
    set({ activeSection: value });
  },
}));
