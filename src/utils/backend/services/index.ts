import { AxiosInstance } from "axios";

export const createService = (axios: AxiosInstance, data: any) =>
  axios.post("/create-service", data);

export const getRolesFromGuildId = (axios: AxiosInstance, guildId: string) =>
  axios.get("/discord-roles", {
    params: {
      guildId: guildId,
    },
  });
