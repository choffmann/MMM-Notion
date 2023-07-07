import MMMNotionOptions from "../props/MMMNotionOptions.ts";
import AppContext from "../context/AppContext.tsx";
import ListView from "./listview/ListView.tsx";

export interface AppProps {
  config: MMMNotionOptions,
}

const App = ({config}: AppProps) => {

  const getLayout = () => {
    return config.databases.map(({layout: {type}, filter, id, sorts}) => {
      switch (type) {
        case "listview":
          return <ListView database={{
            id: id,
            filter: filter,
            sorts: sorts
          }}/>
        default:
          return <div>Unknown layout type '{type}'</div>
      }
    })
  }

  return (
    <AppContext.Provider value={{config}}>
      {getLayout()}
    </AppContext.Provider>
  )
}

export default App
