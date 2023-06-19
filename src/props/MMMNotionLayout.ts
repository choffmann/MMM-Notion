export default interface MMMNotionLayout {
  type: MMMNotionsLayoutType,
  showPersonWithNames: boolean,
  dateFormat: MMMNotionLayoutDateFormat,
  properties: string[]
}

export type MMMNotionsLayoutType = "listview"
export type MMMNotionLayoutDateFormat
  = "full_date" | "month_day_year" | "day_month_year" | "year_month_day" | "relative"
