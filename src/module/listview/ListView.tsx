import {useAppContext} from "../../context/AppContext.tsx";
import {NotionDatabaseProps, useNotion} from "../../hooks/useNotion.ts";
import '../../styles/MMM-Notion-ListView.css'
import {Icon, NotionDatabase, NotionProperty} from "../../model/NotionDatabaseProperties.ts";
import {ReactNode} from "react";
import ListViewTitle from "./ListViewTitle.tsx";

export interface ListViewProps {
  database: NotionDatabaseProps,
}

const ListView = ({database}: ListViewProps) => {
  //const [listViewElements, setListViewElements] = useState<ReactNode[]>([])
  const {config} = useAppContext()
  const createBaseUrl = () => {
    const protocol = config.mirrorConfig?.httpsCertificate === "" || config.mirrorConfig?.httpsPrivateKey === "" ? "http://" : "https://"
    return `${protocol}${config.mirrorConfig?.address}:${config.mirrorConfig?.port}${config.mirrorConfig?.basePath}${config.moduleName}`
  }

  const notionOptions = {
    basePath: createBaseUrl(),
    requestProps: {
      secret: config.secret,
      database: database
    }
  }

  const {notionDatabase} = useNotion(notionOptions)

  const findTitle = (notionProps: NotionProperty[], icon: Icon): React.ReactNode => {
    let title: ReactNode
    for (const key in notionProps) {
      if (notionProps.hasOwnProperty.call(notionProps, key) && notionProps[key].hasOwnProperty('type') && notionProps[key].type === "title") {
        title = <ListViewTitle
          title={notionProps[key].title[0].text.content}
          emoji={icon.emoji}
        />
      }
    }
    return title
  }

  const handleProperties = (response: NotionDatabase): ReactNode[] => {
    let elements: ReactNode[] = []
    for (const result of response.results) {
      elements.push(findTitle(result.properties, result.icon))
    }
    return elements
  }

  return (
    <div id="mmm-notion-listview">
      {notionDatabase !== null ? handleProperties(notionDatabase) : ""}
    </div>
  )

}

export default ListView
