import { useUserStore } from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLogout } from "./useLogout";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export const useAxiosApi = () => {
  const token = useUserStore((s) => s.token);
  const route = useRouter();
  const logout = useLogout();

  useEffect(() => {
    const requestInterseptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          route.replace("/auth");
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterseptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const preventRequest = error.config;
        if (error.response.status === 401) {
          logout();
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterseptor);
      api.interceptors.response.eject(responseInterseptor);
    };
  }, [token]);
  return { api };
};
