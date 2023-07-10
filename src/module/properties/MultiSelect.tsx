import {MultiSelect} from "../../model/NotionDatabaseProperties.ts";

export interface MultiSelectProps {
  multiSelect: MultiSelect[]
}

const MultiSelect = ({multiSelect}: MultiSelectProps) => {

  const multiSelectList = multiSelect.map(tag =>
    <div id="mmm-notion-property-multiselect-element" style={{background: tag.color === "default" ? "lightgray" : tag.color}}>
      {tag.name}
    </div>
  )

  return (
    <div id="mmm-notion-property-multiselect">
      {multiSelectList}
    </div>
  )
}

export default MultiSelect
