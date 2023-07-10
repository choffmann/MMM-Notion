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

  requiresVersion: "2.1.1",

  start: function () {

  },

  getDom: function (): HTMLElement {
    const container = document.createElement('div')
    container.id = this.name.toLowerCase()

    const script = document.createElement('script');
    script.type = "module"
    script.src = this.file('src/main.tsx')
    container.appendChild(script)

    // @ts-ignore
    renderApp(container, {...this.config, moduleName: this.name.toLowerCase(), mirrorConfig: config})

    return container
  },

  getStyles: function () {
    return [
      this.file("styles/MMM-Notion.css"),
    ]
  },

  suspend: function () {

  },

  resume: function () {

  }
})
