import { userAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

/**Readonly proeprties  */
export const useAuthenticator = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token] = useLocalStorage("auth", "");
  const [temp, setTemp] = useState("");
  const route = useRouter();

  useEffect(() => {
    if (user.token === "") {
      if (token) {
        setUser({ token: token });
        setTemp(token);
      } else {
        route.replace("/auth");
      }
    } else {
      setTemp(user.token);
    }
  }, [user]);

  // else redirect
  return { token: temp };
};
