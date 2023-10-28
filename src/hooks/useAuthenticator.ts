import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

/**Readonly proeprties  */
export const useAuthenticator = () => {
  const [token] = useLocalStorage("auth", "");
  const route = useRouter();

  if (!token) route.replace("/auth");
  return { token };
};
