import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const route = useRouter();

  function logOut() {
    clearUser();
    route.push("/");
  }

  return logOut;
};

export { useLogout };
