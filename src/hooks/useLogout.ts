import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

const useLogout = () => {
  const [, setLocalVal] = useLocalStorage("auth", "");
  const route = useRouter();
  const logOut = () => {
    try {
      setLocalVal("");
    } catch (error) {
      console.error(error);
    }
    route.push("/");
  };

  return logOut;
};

export { useLogout };
