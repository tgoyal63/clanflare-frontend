"use client"
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
      <div className="min-h-screen max-w-2xl w-full flex flex-col px-4 md:px-32">
        <h1 className="text-2xl my-8" >{data?.sheet.service.name}</h1>

        <h2>Sheet Name: <a href={data?.sheet.spreadsheetUrl} className="text-primary" target="_blank" >{data?.sheet.sheetName}<LinkIcon className="h-3 w-3 mx-1  inline-block" /></a></h2>

        <table class="table-auto border-collapse text-sm border border-secondary">
          <thead>
            <tr className="bg-secondary/60">
              <th className="border border-secondary py-2 px-4" >Phone Details</th>
              <th className="border border-secondary py-2 px-4">Email Details</th>
              <th className="border border-secondary py-2 px-4">Discord Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-secondary py-2 px-4 text-center">{data?.sheet.phoneNumberColumn + data?.sheet.headerRow}</td>
              <td className="border border-secondary py-2 px-4 text-center">{data?.sheet.emailColumn + data?.sheet.headerRow}</td>
              <td className="border border-secondary py-2 px-4 text-center" >{data?.sheet.discordIdColumn + data?.sheet.headerRow}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
}
