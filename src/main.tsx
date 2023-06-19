import React from "react";
import App from "./module/App.tsx";
import ReactDOM from "react-dom/client";

export function renderApp(container: HTMLElement) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  )
}
