import {StatusOptions} from "../../model/NotionDatabaseProperties.ts";

export interface StatusProps {
  status: StatusOptions
}

const Status = ({status}: StatusProps) => {
  return (
    <div id="mmm-notion-property-status">
      <div id="mmm-notion-property-status-circle" style={{backgroundColor: status.color === "default" ? "lightgray" : status.color}}/>
      <div id="mmm-notion-property-status-text">{status.name}</div>
    </div>
  )
}

export default Status
