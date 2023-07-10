import {PersonBy} from "../../model/NotionDatabaseProperties.ts";
import Person from "./Person.tsx";

export interface PeopleProps {
  peoples: PersonBy[]
  showWithNames: boolean
}

const People = ({peoples, showWithNames}: PeopleProps) => {

  const personList = peoples.map(person =>
    <Person imageUrl={person.avatar_url} name={person.name} showWithNames={showWithNames}/>
  )

  return (
    <>{personList}</>
  )
}

export default People
