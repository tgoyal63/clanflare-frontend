"use client";

import SelectServer from "@/components/addNewServer/forms/SelectServers";
import { useNewServerStore } from "@/store";
import dynamic from 'next/dynamic';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/* sheet */
const LinkSheet = dynamic(() => import('@/components/addNewServer/forms/sheet-linking/LinkSheet'), {
  loading: () => <p>Loading...</p>,
})
const SelectSheet = dynamic(() => import('@/components/addNewServer/forms/sheet-linking/SelectSheet'), {
  loading: () => <p>Loading...</p>,
})
const AddDataCells = dynamic(() => import('@/components/addNewServer/forms/sheet-linking/AddDataCells'), {
  loading: () => <p>Loading...</p>,
})

const AddBot = dynamic(() => import('@/components/addNewServer/forms/AddBot'), {
  loading: () => <p>Loading...</p>,
})

const SelectRoles = dynamic(() => import('@/components/addNewServer/forms/selectBotRoles'), {
  loading: () => <p>Loading...</p>,
})

export default function Page() {
  const params = useSearchParams()
  const updateServerId = useNewServerStore(state => state.updateServer)

  useEffect(() => {
    const serverId = params.get('id')
    if (serverId)
      updateServerId(serverId, false)
  }, [params])

  switch (Number(params.get('step'))) {
    case 1:
      return <SelectServer />;
    case 2:
      return <AddBot />;
    case 3:
      return <LinkSheet />;
    case 4:
      return <HandleMultipleSheet />;
    case 5:
      return <AddDataCells />;
    default:
      return <SelectServer />;
  }
}

function HandleMultipleSheet() {

  const sheets = useNewServerStore(s => s.googleSheet.allSheets)
  const selectedSheet = useNewServerStore(s => s.googleSheet.selectedSheet)

  return <>
    {sheets.length > 1 ? <SelectSheet /> : <AddDataCells />}
  </>

}