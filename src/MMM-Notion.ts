/* global Module */

/* Magic Mirror
 * Module: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */
import MMMNotionOptions from "./props/MMMNotionOptions";
import {renderApp} from "./main.tsx";

Module.register<MMMNotionOptions>("MMM-Notion", {
  defaults: {
    secret: "",
    databases: [
      {
        showTitle: true,
        title: "",
        id: "",
        layout: {
          type: "listview",
          showPersonWithNames: false,
          dateFormat: "full_date", // full_date, month_day_year, day_month_year, year_month_day, relative
          properties: []
        },
        filter: {},
        sorts: []
      }
    ],
    updateInterval: 60000
  },

  start: function (): void {
    this.sendSocketNotification("HERE_IS_YOUR_CONFIG", this.config)
  },

  getDom: function (): HTMLElement {
    const container = document.createElement('div')
    container.id = "mmm-notion"

    const script = document.createElement('script');
    script.type = "module"
    script.src = this.file('src/main.tsx')
    container.appendChild(script)

    renderApp(container)

    return container
  },

})
