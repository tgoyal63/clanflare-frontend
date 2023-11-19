"use client";

import SelectServer from "@/components/addNewServer/forms/SelectServers";
import { Card } from "@/components/ui/card";
import { useNewServerStore } from "@/store";
import { Loader2 } from "lucide-react";
import dynamic from 'next/dynamic';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/* sheet */
const LinkSheet = dynamic(() => import('@/components/addNewServer/forms/sheet-linking/LinkSheet'), {
  loading: () => <FormLoadingSkeleton />
})
const SelectSheet = dynamic(() => import('@/components/addNewServer/forms/sheet-linking/SelectSheet'), {
  loading: () => <FormLoadingSkeleton />
})
const AddDataCells = dynamic(() => import('@/components/addNewServer/forms/sheet-linking/AddDataCells'), {
  loading: () => <FormLoadingSkeleton />
})

const AddBot = dynamic(() => import('@/components/addNewServer/forms/AddBot'), {
  loading: () => <FormLoadingSkeleton />
})

const SelectRoles = dynamic(() => import('@/components/addNewServer/forms/selectBotRoles'), {
  loading: () => <FormLoadingSkeleton />
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

function FormLoadingSkeleton() {
  return <>
    <div className="flex h-lg w-lg flex-col items-center justify-between text-sm">
      <div className="my-auto self-center">
        <Card className="my-auto w-full w-lg h-lg justify-center items-start p-6 shadow-md">
          <Loader2 className="animate-spin" />
        </Card>
      </div>
    </div>
  </>
}

function HandleMultipleSheet() {
  // will use title for selected sheets as condition to check if a sheet has been selected
  const titleAsCondition = useNewServerStore(s => s.googleSheet.selectedSheet.title)

  return <>
    {titleAsCondition ? <AddDataCells /> : <SelectSheet />}
  </>
}