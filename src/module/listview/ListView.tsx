import '../../styles/MMM-Notion-ListView.css'
import {NotionDatabaseResult, NotionProperty} from "../../model/NotionDatabaseProperties.ts";
import ListViewTitle from "./ListViewTitle.tsx";
import PropertiesView from "./PropertiesView.tsx";
import MMMNotionOptionsDatabase from "../../props/MMMNotionOptionsDatabase.ts";

export interface ListViewProps {
  databaseOptions: MMMNotionOptionsDatabase
  results: NotionDatabaseResult[]
}

const ListView = ({results, databaseOptions}: ListViewProps) => {
  const findTitleProp = (notionProps: NotionProperty): string => {
    for (const key in notionProps) {
      if (notionProps.hasOwnProperty.call(notionProps, key) && notionProps[key].hasOwnProperty('type') && notionProps[key].type === "title") {
        return notionProps[key].title[0].text.content
      }
    }
    return ""
  }

  const listResults = results.map(r =>
    <div id="mmm-notion-listview-element">
      <ListViewTitle title={findTitleProp(r.properties)} emoji={r.icon.emoji}/>
      <PropertiesView notionProperties={r.properties} databaseOptions={databaseOptions}/>
    </div>
  )

  return (
    <div id="mmm-notion-listview">
      {listResults}
    </div>
  )
}

export default ListView
