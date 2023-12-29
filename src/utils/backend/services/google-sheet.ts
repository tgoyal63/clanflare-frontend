import { AxiosInstance, AxiosResponse } from "axios";
import { IBackendResponse } from "../type";


export interface ISheetDetails {
  service: Service
  sheet: Sheet
}

export interface Service {
  _id: string
  name: string
  guildId: string
  creator: any
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
  service: Service2
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

//TODO : service Detail is setn twice , its waste of bandwith
// contact backend to fix it
export interface Service2 {
  _id: string
  name: string
  guildId: string
  creator: string
  roles: string[]
  isCustom: boolean
  customIntegrationId: any
  integrationType: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export const getSheetServiceDetailsById = async (
  axios: AxiosInstance,
  serviceId: string
): Promise<AxiosResponse<IBackendResponse<ISheetDetails>>> =>
  await axios.get(`/service/${serviceId}`);

