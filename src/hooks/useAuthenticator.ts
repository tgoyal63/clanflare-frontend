import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

/**Readonly proeprties  */
export const useAuthenticator = () => {
  const [token] = useLocalStorage("auth", "");
  const route = useRouter();

  useEffect(() => {
    if (!token) route.replace("/auth");
  }, [token]);
  return { token };
};
