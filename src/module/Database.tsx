import MMMNotionOptionsDatabase from "../props/MMMNotionOptionsDatabase.ts";
import ListView from "./listview/ListView.tsx";
import {useNotionDatabase} from "../hooks/useNotionDatabase.ts";
import {NotionDatabase} from "../model/NotionDatabaseProperties.ts";


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
        return <ListView results={database.results}/>
      default:
        return <div>Unknown layout type '{databaseOptions.layout.type}'</div>
    }
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ein Fehler ist bei der Anfrage aufgetreten</p>}
      {data !== undefined && renderLayout(data)}
    </div>
    // <>{isError ? "Ein Fehler ist bei der Anfrage aufgetreten" : renderLayout()}</>
  )
}

export default Database
