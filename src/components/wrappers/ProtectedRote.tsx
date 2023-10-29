"use client";
import { useLogout } from "@/hooks/useLogout";
import { useUserStore } from "@/store";
import { ReactNode, useEffect } from "react";

interface Props {
  children?: ReactNode;
}

/** validates based on exitance of token  */
export default function ProtectedRoute({ children }: Props) {
  const token = useUserStore((state) => state.token);
  const logout = useLogout();
  useEffect(() => {
    if (!token) {
      logout();
    }
  }, [token]);

  return <>{children}</>;
}
