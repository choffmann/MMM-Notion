import {useEffect, useState} from "react";
import {ApiResponse} from "../model/ApiResponse.ts";
import {NotionDatabase} from "../model/NotionDatabaseProperties.ts";

export interface NotionDatabaseProps {
  id: string,
  sorts: any[],
  filter?: any
}

export interface NotionRequestProps {
  secret: string,
  database: NotionDatabaseProps
}

export interface UseNotionProps {
  basePath: string,
  requestProps: NotionRequestProps
}

export function useNotion(config: UseNotionProps) {
  const [notionDatabase, setNotionDatabase] = useState<NotionDatabase | null>(null)

  useEffect(() => {
    fetch(`${config.basePath}/database`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        secret: config.requestProps.secret,
        database: config.requestProps.database
      })
    })
      .then((res: Response) => res.json())
      .then((data: ApiResponse<NotionDatabase>) => {
        if (data.data !== undefined) {
          setNotionDatabase(data.data)
        }
      })
  }, [])

  return {notionDatabase}
}
