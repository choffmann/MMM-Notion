import MMMNotionOptions from "../props/MMMNotionOptions.ts";
import AppContext from "../context/AppContext.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import Database from "./Database.tsx";
import {IntlProvider} from "react-intl";

export interface AppProps {
  config: MMMNotionOptions,
}

const App = ({config}: AppProps) => {

  const queryClient = new QueryClient()
  const databases = config.databases.map(database => <Database databaseOptions={database}/>)

  return (
    <AppContext.Provider value={{config}}>
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale={config.mirrorConfig?.locale ?? 'en'}>
          {databases}
        </IntlProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  )
}

export default App
