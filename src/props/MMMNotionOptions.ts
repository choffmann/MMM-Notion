import MMMNotionOptionsDatabase from "./MMMNotionOptionsDatabase";

export default interface MMMNotionOptions {
  secret: string,
  databases: MMMNotionOptionsDatabase[],
  updateInterval: number,
  moduleName?: string,
  mirrorConfig?: MMMNotionMirrorConfig
}

export interface MMMNotionMirrorConfig {
  address: string
  basePath: string
  customCss: string
  electronOptions: any
  httpHeaders: {
    contentSecurityPolicy: boolean
    crossOriginEmbedderPolicy: boolean
    crossOriginOpenerPolicy: boolean
    crossOriginResourcePolicy: boolean
    originAgentCluster: boolean
  }
  httpsCertificate: string
  httpsPrivateKey: string
  ipWhitelist: string[]
  kioskmode: boolean
  language: string
  locale: string
  logLevel: string[]
  modules: any[]
  path: {
    modules: string
    vendor: string
  }
  port: string
  timeFormat: string
  units: string
  useHttps: boolean
  zoom: number
}
