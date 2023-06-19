import MMMNotionOptionsDatabase from "./MMMNotionOptionsDatabase";

export default interface MMMNotionOptions {
  secret: string,
  databases: MMMNotionOptionsDatabase[],
  updateInterval: number
}
