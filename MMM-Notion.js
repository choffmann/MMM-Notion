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
				showTitle: true,
				title: "",
				id: "",
				layout: {
					type: "listview",
					showPersonWithNames: false,
					displayElementTitle: true,
					dateFormat: "full_date", // full_date, month_day_year, day_month_year, year_month_day, relative
					properties: []
				},
				filter: {},
				sorts: []
			}
		],
		updateInterval: 60000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function () {
		const self = this;
		this.databases = [];
		this.status = "loading"
		this.error = ""
		this.id = Date.now() + Math.floor(Math.random() * 100)

		this.config = {...this.config, callId: this.id}
		this.sendSocketNotification("MMM-NOTION-HERE_IS_YOUR_CONFIG", this.config);
		self.sendSocketNotification("MMM-NOTION-UPDATE_PLEASE", self.id);
		setInterval(function () {
			self.sendSocketNotification("MMM-NOTION-UPDATE_PLEASE", self.id);
			self.updateDom();
		}, this.config.updateInterval);
	},

	getDom: function () {
		// create element wrapper for show into the module
		const wrapper = document.createElement("div");
		wrapper.id = "mmm-notion";
		switch (this.status) {
			case "loading":
				wrapper.innerText = "Loading..."
				break;
			case "success":
				try {
					this.databases.forEach(database => {
						this.createDatabaseView(wrapper, database)
					})
				} catch (e) {
					this.handleError(e)
				}
				break;
			case "error":
				wrapper.innerText = this.error
				break
		}

		return wrapper;
	},

	handleError: function (error) {
		this.status = "error"
		console.error(error)
		this.error = error
		this.updateDom();
	},

	createDatabaseView: function (wrapper, properties) {
		const container = document.createElement("div")
		const databaseTitle = document.createElement("div")
		container.id = "mmm-notion-database"
		databaseTitle.id = "mmm-notion-database-title"
		databaseTitle.innerText = `${properties.title}:`
		if (properties.title !== undefined) {
			if (properties.showTitle === undefined || properties.showTitle)
				container.appendChild(databaseTitle)
		}
		this.createListView(container, properties)
		wrapper.appendChild(container)
	},

	createListView: function (wrapper, properties) {
		const listView = new ListView(properties)
		wrapper.appendChild(listView.wrapper)
	},

	getScripts: function () {
		return [
			this.file('scripts/DateFormat.js'),
			this.file('scripts/layout/listview/ListView.js'),
			this.file('scripts/layout/listview/ListViewElement.js'),
			this.file('scripts/layout/PropertiesView.js')
		];
	},

	getStyles: function () {
		return [
			this.file("styles/MMM-Notion.css"),
			this.file("styles/MMM-Notion-ListView.css"),
		];
	},

	// Load translations files
	getTranslations: function () {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		console.log("get notify", this.id, notification)
		if (notification === `MMM-Notion-DATABASE-DATA-${this.id}`) {
			this.databases = payload;
			this.status = "success"
			this.updateDom();
		} else if (notification === `MMM-Notion-DATABASE-ERROR-${this.id}`) {
			this.handleError(JSON.parse(payload.body).message)
		}
	},
});
