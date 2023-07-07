import MMMNotionLayout from "./MMMNotionLayout";

export default interface MMMNotionOptionsDatabase {
  showTitle: boolean,
  title: string,
  id: string,
  layout: MMMNotionLayout,
  filter: any,
  sorts: any[]
}
