import {NotionProperty} from "../../model/NotionDatabaseProperties.ts";
import {useEffect, useState} from "react";
import MMMNotionOptionsDatabase from "../../props/MMMNotionOptionsDatabase.ts";
import Checkbox from "../properties/Checkbox.tsx";
import RichText from "../properties/RichText.tsx";
import Number from "../properties/Number.tsx";
import Select from "../properties/Select.tsx";
import Url from "../properties/Url.tsx";
import Person from "../properties/Person.tsx";
import People from "../properties/People.tsx";
import Email from "../properties/Email.tsx";
import MultiSelect from "../properties/MultiSelect.tsx";
import Status from "../properties/Status.tsx";

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
      case "title":
        break;
      case "select":
        return <Select value={property.select.name} color={property.select.color}/>
      case "url":
        return <Url value={property.url}/>
      case "last_edited_time":
        break;
      case "created_time":
        break;
      case "phone_number":
        break;
      case "created_by":
        if (property.created_by.object === "user")
          return <Person name={property.created_by.name} imageUrl={property.created_by.avatar_url} showWithNames={databaseOptions.layout.showPersonWithNames}/>
        break;
      case "last_edited_by":
        if (property.last_edited_by.object === "user")
          return <Person name={property.last_edited_by.name} imageUrl={property.last_edited_by.avatar_url} showWithNames={databaseOptions.layout.showPersonWithNames}/>
        break;
      case "people":
        return <People peoples={property.people} showWithNames={databaseOptions.layout.showPersonWithNames}/>
      case "email":
        return <Email email={property.email}/>
      case "multi_select":
        return <MultiSelect multiSelect={property.multi_select}/>
      case "status":
        return <Status status={property.status}/>
      case "date":
        break;
      case "checkbox":
        return <Checkbox checked={property.checkbox}/>
      case "rich_text":
        return <RichText rich_text={property.rich_text}/>
      case "number":
        return <Number number={property.number}/>
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
