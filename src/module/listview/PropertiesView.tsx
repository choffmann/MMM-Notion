import {NotionProperty} from "../../model/NotionDatabaseProperties.ts";
import {useEffect, useState} from "react";
import MMMNotionOptionsDatabase from "../../props/MMMNotionOptionsDatabase.ts";

export interface PropertiesViewProps {
  notionProperties: NotionProperty,
  databaseOptions: MMMNotionOptionsDatabase
}

const PropertiesView = ({notionProperties, databaseOptions}: PropertiesViewProps) => {
  const [propsToShow, setPropsToShow] = useState<NotionProperty[]>([])

  useEffect(() => {
    filterProperties()
  }, [])

  const filterProperties = () => {
    databaseOptions.layout.properties.forEach(propToShow => {
      for (const key in notionProperties) {
        if (propToShow === key) {
          setPropsToShow(props => [...props, notionProperties[key]])
        }
      }
    })
  }

  const propsList = propsToShow.map(property => {
    switch (property.type) {
      case "checkbox":
        return <div>Checkbox</div>
      default:
        return <div>Prop</div>
    }
  })

  return (
    <div id="mmm-notion-property">
      {propsList}
    </div>
  )
}

export default PropertiesView
