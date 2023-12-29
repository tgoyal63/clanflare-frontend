
import { create } from "zustand";
import { persist } from "zustand/middleware";

type IntigrationData = {
  phoneNumber: number | null;
  serviceId: string | null;
  mango: string | null;
};

type Action = {
  updatePhoneNumber: (phoneNumber: number) => void,
  updateServiceId: (serviceId: string) => void,
  updateMango: (mango: string) => void,
  clearTagmangoIntigrationData: () => void;
};

const defaultUser: IntigrationData = {
  phoneNumber: null,
  mango: null,
  serviceId: null
};

export const userTagmMangoIntigrationStore = create<IntigrationData & Action>()(
  persist(
    (set) => ({
      ...defaultUser,
      updateMango: (mango: string) => set(state => ({ ...state, mango: mango })),
      updatePhoneNumber: (phoneNumber: number) => set(state => ({ ...state, phoneNumber: phoneNumber })),
      updateServiceId: (serviceId: string) => set(state => ({ ...state, serviceId: serviceId })),
      clearTagmangoIntigrationData: () => set(() => defaultUser)
    }),
    {
      name: "intigration-data",
    },
  ),
);
