import { AxiosInstance, AxiosResponse } from "axios";
import { IBackendResponse } from "../type";


export interface ISheetDetails {
  sheet: Sheet
  guild: Guild
}


export interface Guild {
  id: string
  name: string
  icon: any
  owner: boolean
  permissions: string
  features: any[]
}

export interface Service {
  _id: string
  name: string
  guildId: string
  creator: {
    username: string
  }
  roles: string[]
  isCustom: boolean
  customIntegrationId: any
  integrationType: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Sheet {
  _id: string
  service: Service
  phoneNumberColumn: string
  emailColumn: string
  discordIdColumn: string
  headerRow: number
  sheetName: string
  spreadsheetId: string
  spreadsheetUrl: string
  sheetId: number
  guildId: string
  createdAt: string
  updatedAt: string
  __v: number
}


export const getSheetServiceDetailsById = async (
  axios: AxiosInstance,
  serviceId: string
): Promise<AxiosResponse<IBackendResponse<ISheetDetails>>> =>
  await axios.get(`/service/${serviceId}`);

