import { create } from "zustand";

export type PreferenceState = {
  viewType: string;
  dateJump: string;
  language: string;
  options: {
    token: string;
  };
  updateOptions: (options: { token: string }) => void;
  updateViewType: (viewType: string) => void;
  updateLanguage: (language: string) => void;
  updateDateJump: (dateJump: string) => void;
};

const usePreferenceStore = create<PreferenceState>((set) => ({
  // Initial state
  viewType: "list",
  dateJump: "weeks",
  language: "",
  options: {
    token: "",
  },

  // Actions
  updateOptions: (options) => set({ options }),
  updateViewType: (viewType) => set({ viewType }),
  updateLanguage: (language) => set({ language }),
  updateDateJump: (dateJump) => set({ dateJump }),
}));

export default usePreferenceStore;
