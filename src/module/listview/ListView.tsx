import '../../styles/MMM-Notion-ListView.css'
import {NotionDatabaseResult, NotionProperty} from "../../model/NotionDatabaseProperties.ts";
import ListViewTitle from "./ListViewTitle.tsx";

export interface ListViewProps {
  results: NotionDatabaseResult[]
}

const ListView = ({results}: ListViewProps) => {

  const findTitleProp = (notionProps: NotionProperty[]): string => {
    for (const key in notionProps) {
      if (notionProps.hasOwnProperty.call(notionProps, key) && notionProps[key].hasOwnProperty('type') && notionProps[key].type === "title") {
        return notionProps[key].title[0].text.content
      }
    }
    return ""
  }

  const listResults = results.map(r => <ListViewTitle title={findTitleProp(r.properties)} emoji={r.icon.emoji}/>)

  return (
    <div id="mmm-notion-listview">
      {listResults}
    </div>
  )
}

export default ListView
