export interface PersonProps {
  name: string
  imageUrl: string
  showWithNames: boolean
}

const Person = (props: PersonProps) => {
  return (
    <div id="mmm-notion-property-person_chip_name">
      <img id="mmm-notion-property-person" src={props.imageUrl} width={20} height={20} alt="person avatar image"/>
      {props.showWithNames && <div id="mmm-notion-property-person_name">{props.name}</div>}
    </div>
  )
}

export default Person
