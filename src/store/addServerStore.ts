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
    url: string;
    allSheets: sheetData[];
    selectedSheet: sheetData;
  };
};

export type sheetData = {
  index: number;
  title: string;
  sheetId: number;
};

type Actions = {
  updateServer: (id: string, isVerified: boolean) => void;
  /** replace all sheet array  */
  updateGoogleSheetData: (data: sheetData[]) => void;
  /** update url*/
  updateGoogleSheetUrl: (url: string) => void;
  updateSelectedSheet: (data: sheetData) => void;
};

const defaultData = {
  googleSheet: {
    url: "",
    allSheets: [],
    selectedSheet: {
      index: 0,
      sheetId: 0,
      title: "",
    },
  },

  server: {
    id: "",
    isVerified: false,
  },
};

export const useNewServerStore = create<AddNewServerData & Actions>()(
  persist(
    (set, get) => ({
      googleSheet: defaultData.googleSheet,
      server: defaultData.server,

      updateServer: (id, isVerified) => {
        const newServer = {
          id,
          isVerified,
        };
        return set((state) => ({ ...state, server: newServer }));
      },
      updateGoogleSheetData: (data) => {
        return set((s) => ({
          ...s,
          googleSheet: {
            ...s.googleSheet,
            allSheets: data,
          },
        }));
      },
      updateSelectedSheet: (data) => {
        return set((state) => ({
          ...state,
          googleSheet: {
            ...state.googleSheet,
            selectedSheet: data,
          },
        }));
      },
      updateGoogleSheetUrl: (url) => {
        return set((state) => ({
          ...state,
          googleSheet: {
            ...state.googleSheet,
            url: url,
          },
        }));
      },
    }),
    {
      name: "new-server-data",
    },
  ),
);
