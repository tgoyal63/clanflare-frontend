import { AxiosInstance, AxiosResponse } from "axios";
import { IBackendResponse } from "../type";

export interface IGetService_Data {
  _id: string;
  name: string;
  roles: string[];
  isCustom: boolean;
  customIntegrationId: null | string;
  integrationType: "sheets" | "tagmango";
  guild: {
    id: string;
    name: string;
    icon: string | null;
    owner: string;
  };
  status: string;
  spreadsheet: string;
  createdAt: string;
}

export const getServices = async (
  axios: AxiosInstance,
): Promise<AxiosResponse<IBackendResponse<IGetService_Data[]>>> =>
  await axios.get("/services");

export interface IGetUserGuilds_Data {
  id: string;
  name: string;
  icon: string;
  isAdmin: boolean;
}

export const getUserGuilds = async (
  axios: AxiosInstance,
): Promise<AxiosResponse<IBackendResponse<IGetUserGuilds_Data[]>>> =>
  await axios.get("/guilds");
