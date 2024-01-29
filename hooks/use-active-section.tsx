import { activeSectionType, sectionType } from "@/types/activeSection";
import { create } from "zustand";

export const useActiveSection = create<sectionType>((set) => ({
  activeSection: "",
  setActiveSection: (value) => {
    localStorage.setItem("activeSection", value);
    set({ activeSection: value });
  },
}));
