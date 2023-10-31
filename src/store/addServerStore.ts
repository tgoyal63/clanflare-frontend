import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  bot: {
    roles: string[];
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
  /** update url (Replace)*/
  updateGoogleSheetUrl: (url: string) => void;
  updateSelectedSheet: (data: sheetData) => void;
  /** Replace Roles*/
  replaceRole: (roles: string[]) => void;
  clean: () => void;
};

const defaultData: AddNewServerData = {
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
  bot: {
    roles: [],
  },
};

export const useNewServerStore = create<AddNewServerData & Actions>()(
  persist(
    (set, get) => ({
      googleSheet: defaultData.googleSheet,
      server: defaultData.server,
      bot: defaultData.bot,

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
      clean: () =>
        set((state) => {
          if (state.server.id) return defaultData;
          return state;
        }),
      replaceRole: (role) =>
        set((state) => {
          let temp = state;
          temp.bot.roles = role;
          return temp;
        }),
    }),
    {
      name: "new-server-data",
    },
  ),
);
