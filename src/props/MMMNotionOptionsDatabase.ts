import MMMNotionLayout from "./MMMNotionLayout";

export default interface MMMNotionOptionsDatabase {
  showTitle: boolean,
  title: string,
  id: string,
  layout: MMMNotionLayout,
  filter: object,
  sorts: string[]
}
