import MMMNotionOptionsDatabase from "../props/MMMNotionOptionsDatabase.ts";
import ListView from "./listview/ListView.tsx";
import {useNotionDatabase} from "../hooks/useNotionDatabase.ts";
import {NotionDatabase} from "../model/NotionDatabaseProperties.ts";
import {FormattedMessage} from "react-intl";


interface DatabaseProps {
  databaseOptions: MMMNotionOptionsDatabase
}

const Database = ({databaseOptions}: DatabaseProps) => {
  const {data, isLoading, isError} = useNotionDatabase({
    id: databaseOptions.id,
    sorts: databaseOptions.sorts,
    filter: databaseOptions.filter
  })

  const renderLayout = (database: NotionDatabase) => {
    switch (databaseOptions.layout.type) {
      case "listview":
        return <ListView results={database.results} databaseOptions={databaseOptions}/>
      default:
        return <FormattedMessage id="unknown_layout_type" defaultMessage="Unbekanntes Layout '{layout}'" values={{layout: databaseOptions.layout.type}}/>
    }
  }

  return (
    <div>
      {isLoading && <FormattedMessage id="request_loading" defaultMessage="Laden..."/>}
      {isError && <FormattedMessage id="request_error" defaultMessage="Ein Fehler ist bei der Anfrage aufgetreten"/>}
      {data !== undefined && renderLayout(data)}
    </div>
  )
}

export default Database
