import React from "react";
import App from "./module/App.tsx";
import ReactDOM from "react-dom/client";
import MMMNotionOptions from "./props/MMMNotionOptions.ts";

export function renderApp(container: HTMLElement, config: MMMNotionOptions) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App config={config}/>
    </React.StrictMode>,
  )
}
