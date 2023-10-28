import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthenticator } from "./useAuthenticator";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

export const useAxiosApi = () => {
  const { token, isLoading: isTokenLoading } = useAuthenticator();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestInterseptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
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
          route.push("/auth");
        }

        return Promise.reject(error);
      },
    );
    setIsLoading(false);
    return () => {
      api.interceptors.request.eject(requestInterseptor);
      api.interceptors.response.eject(responseInterseptor);
    };
  }, [token]);
  return { api, isLoading: isLoading && isTokenLoading };
};
