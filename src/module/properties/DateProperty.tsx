import {FormatDateOptions, FormattedDate, FormattedDateTimeRange, useIntl} from "react-intl";
import {DateOptions} from "../../model/NotionDatabaseProperties.ts";
import {MMMNotionLayoutDateFormat} from "../../props/MMMNotionLayout.ts";

export interface DateProps {
  date?: DateOptions
  dateFormat: MMMNotionLayoutDateFormat
}

const DateProperty = ({date, dateFormat}: DateProps) => {
  const intl = useIntl()

  const handleConfigDateFormat = (): FormatDateOptions => {
    switch (dateFormat) {
      case "full_date":
        return {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: date?.time_zone
        }
      default:
        return {
          day: "2-digit",
          month: "long",
          year: "numeric",
          timeZone: date?.time_zone
        }
    }
  }

  const getDateValue = () => {
    if (date?.start != null && date?.end == null)
      return intl.formatDate(new Date(date.start), handleConfigDateFormat())
    else if (date?.start != null && date?.end != null) {
      //return <FormattedDateTimeRange from={new Date(date.start)} to={new Date(date.end)} />
      return intl.formatDateTimeRange(new Date(date.start), new Date(date.end), handleConfigDateFormat())
    }
  }

  return (
    <div id="mmm-notion-property-date">
      {getDateValue()}
    </div>
  )
}

export default DateProperty
