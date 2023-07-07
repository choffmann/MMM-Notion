import MMMNotionOptions from "../props/MMMNotionOptions.ts";
import React, {useContext} from "react";

export interface AppContext {
  config: MMMNotionOptions
}

const AppContext = React.createContext<AppContext | null>(null)

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === null) {
    throw Error("Did you create AppContext.Provider?")
  }
  return context!!
}

export default AppContext
