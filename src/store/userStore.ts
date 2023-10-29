import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = {
  token: string;
  phoneverified: boolean;
  setToken: (token: string) => void;
};

export const useUserStore = create<User>()(
  persist(
    (set) => ({
      token: "",
      phoneverified: false,
      setToken: (token) => set((state) => ({ ...state, token: token })),
    }),
    {
      name: "user-data",
    },
  ),
);
