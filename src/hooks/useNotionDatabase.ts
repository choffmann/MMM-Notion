import {NotionDatabase} from "../model/NotionDatabaseProperties.ts";
import {useQuery} from "react-query";
import {useAppContext} from "../context/AppContext.tsx";
import {ApiResponse} from "../model/ApiResponse.ts";

export interface NotionDatabaseProps {
  id: string,
  sorts: any[],
  filter?: any
}

function getNotionDatabase(basePath: string, secret: string, database: NotionDatabaseProps): Promise<ApiResponse<NotionDatabase>> {
  return fetch(`${basePath}/database`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      secret: secret,
      database: database
    })
  })
    .then((res: Response) => res.json())
}

export function useNotionDatabase(databaseOptions: NotionDatabaseProps) {
  const {config} = useAppContext()

  const basePath = () => {
    const protocol = config.mirrorConfig?.useHttps ? "https://" : "http://"
    return `${protocol}${config.mirrorConfig?.address}:${config.mirrorConfig?.port}${config.mirrorConfig?.basePath}${config.moduleName}`
  }

  const {data, isLoading, isError} = useQuery<ApiResponse<NotionDatabase>>(
    {
      queryKey: "notionDatabase",
      queryFn: () => getNotionDatabase(basePath(), config.secret, databaseOptions),
      refetchInterval: config.updateInterval * 60000
    })

  return {data: data?.data, isLoading, isError}
}
