import { userAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

/**Readonly proeprties  */
export const useAuthenticator = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token] = useLocalStorage("auth", "");
  const route = useRouter();

  const [temp, setTemp] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user.token === "") {
      if (token) {
        setUser({ token: token });
        setTemp(token);
        setIsLoading(false);
      } else {
        route.replace("/auth");
      }
    } else {
      setTemp(user.token);
      setIsLoading(false);
    }
  }, [user]);

  // else redirect
  return { token: temp, isLoading };
};
