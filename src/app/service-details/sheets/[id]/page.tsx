"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useAxiosApi } from "@/hooks/useAxiosApi"
import { getSheetServiceDetailsById } from "@/utils/backend/services/google-sheet"
import { useQuery } from "@tanstack/react-query"
import { LinkIcon } from "lucide-react"


export default function Page({ params }: { params: { id: string } }) {

  const { api } = useAxiosApi()
  const { id } = params
  const { data } = useQuery({
    queryKey: ["sheets-data", id],
    queryFn: async () => {
      const res = await getSheetServiceDetailsById(api, id)
      return res.data.data
    }
  })

  return <>
    <div className="w-full flex flex-col items-center">
      <div className="min-h-screen max-w-2xl my-4 w-full flex flex-col px-4 md:px-32">
        <Card className="p-2 gap-2 flex items-center">
          <Avatar>
            <AvatarImage src={data?.guild.icon || ""} />
            <AvatarFallback>{data?.guild.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {data?.guild.name}
          </div>
        </Card>
        <h1 className="text-2xl my-8 font-mono" ><span className="bold" >Service Name</span>{data?.sheet.service.name}</h1>

        <h2 className="font-mono">Sheet Name: <a href={data?.sheet.spreadsheetUrl} className="text-primary" target="_blank" >{data?.sheet.sheetName}<LinkIcon className="h-3 w-3 mx-1  inline-block" /></a></h2>
        <h2 className="font-mono" >Sheet Data Cells</h2>
        <table className="table-auto border-collapse text-sm border border-secondary">
          <thead>
            <tr className="bg-secondary/60">
              <th className="border border-secondary py-2 px-4" >Phone Details</th>
              <th className="border border-secondary py-2 px-4">Email Details</th>
              <th className="border border-secondary py-2 px-4">Discord Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-secondary py-2 px-4 text-center">!{data?.sheet.phoneNumberColumn || "" + data?.sheet.headerRow}</td>
              <td className="border border-secondary py-2 px-4 text-center">!{data?.sheet.emailColumn || "" + data?.sheet.headerRow}</td>
              <td className="border border-secondary py-2 px-4 text-center" >!{data?.sheet.discordIdColumn || "" + data?.sheet.headerRow}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}
