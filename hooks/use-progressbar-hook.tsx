import { create } from "zustand";
type progressBarType = {
  progress: number;
  increaseProgress: (number?: number) => void;
  decreaseProgress: (number?: number) => void;
  increaseProgressByNumber: (number: number) => void;
};
export const useProgressBar = create<progressBarType>((set) => ({
  progress: 0,
  increaseProgress: (number) => set({ progress: number }),
  increaseProgressByNumber: (number) =>
    set((prev) => ({ progress: prev.progress + number })),
  decreaseProgress: () => set((prev) => ({ progress: prev.progress - 1 })),
}));
