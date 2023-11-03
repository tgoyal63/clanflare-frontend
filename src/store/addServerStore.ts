import { create } from "zustand";
import { persist } from "zustand/middleware";

type AddNewServerData = {
  // TODO: change server to guild
  server: {
    id: string;
    isVerified: boolean;
  };
  googleSheet: {
    url: string;
    allSheets: sheetData[];
    selectedSheet: sheetData;
    cells: {
      userPhone: string;
      userEmail: string;
      userDiscordId: string;
    };
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
  /** Replace */
  updateGoogleSheetData: (data: sheetData[]) => void;
  updateGoogleSheetUrl: (url: string) => void;
  updateSelectedSheet: (data: sheetData) => void;
  replaceRole: (roles: AddNewServerData["bot"]["roles"]) => void;
  replaceCells: (data: AddNewServerData["googleSheet"]["cells"]) => void;
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
    cells: {
      userDiscordId: "",
      userEmail: "",
      userPhone: "",
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
      replaceCells: (data) =>
        set((state) => {
          const newState = state;
          newState.googleSheet.cells = data;
          return newState;
        }),
    }),
    {
      name: "new-server-data",
    },
  ),
);
