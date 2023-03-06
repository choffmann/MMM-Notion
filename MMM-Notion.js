/* global Module */

/* Magic Mirror
 * Module: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

Module.register("MMM-Notion", {
	defaults: {
		secret: "",
		databases: [
			{
				name: "",
				id: "",
				layout: "",
				properties: [],
				filter: {},
				sorts: []
			}
		],
		updateInterval: 60000,
		retryDelay: 5000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function () {
		var self = this;
		this.text = "";

		this.sendSocketNotification("HERE_IS_YOUR_CONFIG", this.config);
		setInterval(function () {
			self.sendSocketNotification("UPDATE_PLEASE");
			self.updateDom();
		}, this.config.updateInterval);
	},

	getDom: function () {
		// create element wrapper for show into the module
		const wrapper = document.createElement("div");
		wrapper.id = "notion-table";
		wrapper.innerText = this.text
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-Notion.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "MMM-Notion-DATABASE-DATA") {
			this.text = payload;
			this.updateDom();
		}
	},
});
