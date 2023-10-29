import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = {
  token: string;
  phoneverified: boolean;
};

type Action = {
  setToken: (token: string) => void;
  clearUser: () => void;
};

const defaultUser: User = {
  token: "",
  phoneverified: false,
};

export const useUserStore = create<User & Action>()(
  persist(
    (set) => ({
      token: "",
      phoneverified: false,
      setToken: (token) => set((state) => ({ ...state, token: token })),
      clearUser: () => {
        return set(() => defaultUser);
      },
    }),
    {
      name: "user-data",
    },
  ),
);
