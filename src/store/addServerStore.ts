import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = {
  token: string;
  phoneverified: boolean;
  setToken: (token: string) => void;
};

type AddNewServerData = {
  server: {
    id: string;
    isVerified: boolean;
  };
  googleSheet: {
    id: string;
  };
};

type Actions = {
  updateServer: (id: string, isVerified: boolean) => void;
  updateGoogleSeheet: (id: string, isVerified: boolean) => void;
};

export const useNewServerStore = create<AddNewServerData & Actions>()(
  persist(
    (set) => ({
      googleSheet: {
        id: "",
      },
      server: {
        id: "",
        isVerified: false,
      },
      updateGoogleSeheet: (id) => {
        const temp = { id: id };
        return set((state) => ({ ...state, temp }));
      },
      updateServer: (id, isVerified) => {
        const newServer = {
          id,
          isVerified,
        };
        return set((state) => ({ ...state, server: newServer }));
      },
    }),
    {
      name: "new-server-data",
    },
  ),
);
