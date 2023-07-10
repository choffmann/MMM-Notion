import MMMNotionOptions from "../props/MMMNotionOptions.ts";
import AppContext from "../context/AppContext.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import Database from "./Database.tsx";

export interface AppProps {
  config: MMMNotionOptions,
}

const App = ({config}: AppProps) => {

  const queryClient = new QueryClient()
  const databases = config.databases.map(database => <Database databaseOptions={database}/>)

  return (
    <AppContext.Provider value={{config}}>
      <QueryClientProvider client={queryClient}>
        {databases}
      </QueryClientProvider>
    </AppContext.Provider>
  )
}

export default App
