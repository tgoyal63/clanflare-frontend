"use client"
import AddBotToServer from "@/components/shared/AddBotToServer";
import { useNewServerStore } from "@/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const param = useSearchParams()
  const saveData = useNewServerStore(s => s.updateServer)

  useEffect(() => {
    const id = param.get("id")
    if (id) {
      saveData(id, false)
    }
  }, [])
  return (
    <div className="grid h-screen place-items-center">
      <AddBotToServer redirectLoaction="/add-services/tag-mango" />
    </div>
  );
}
