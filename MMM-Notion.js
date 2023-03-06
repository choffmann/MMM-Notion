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
		this.databases = [];

		this.sendSocketNotification("HERE_IS_YOUR_CONFIG", this.config);
		setInterval(function () {
			self.sendSocketNotification("UPDATE_PLEASE");
			self.updateDom();
		}, this.config.updateInterval);
	},

	getDom: function () {
		// create element wrapper for show into the module
		const wrapper = document.createElement("div");
		wrapper.id = "mmm-notion";
		this.databases.forEach(database => {
			this.createListView(wrapper, database)
		})
		return wrapper;
	},

	createListView: function (wrapper, properties) {
		// Name.........................Tag Tag
		const list = document.createElement("div")
		wrapper.appendChild(list)
		list.id = "mmm-notion-listview"

		properties.data.forEach(prop => {
			const pageElement = document.createElement("div")
			pageElement.id = "mmm-notion-listview-element"

			this.createTitleContainer(pageElement, prop)
			this.createPropertiesContainer(pageElement, prop, properties.properties)

			list.appendChild(pageElement)
		})
	},

	findTitleProp: function (properties) {
		for (const key in properties) {
			if (properties.hasOwnProperty.call(properties, key) && properties[key].hasOwnProperty('type') && properties[key].type === "title") {
				return properties[key].title[0].text.content
			}
		}
	},

	createTitleContainer: function (wrapper, props) {
		const titleContainer = document.createElement("div")
		titleContainer.id = "mmm-notion-listview-titleContainer"
		this.createTitleEmoji(titleContainer, props.icon.emoji)
		this.createTitle(titleContainer, this.findTitleProp(props.properties))
		wrapper.appendChild(titleContainer)
	},

	createTitle: function (wrapper, title) {
		const titleDom = document.createElement("div")
		titleDom.id = "mmm-notion-listview-title"
		titleDom.innerText = title
		wrapper.appendChild(titleDom)
	},

	createTitleEmoji: function (wrapper, emoji) {
		const emojiDom = document.createElement("div")
		emojiDom.id = "mmm-notion-listview-emoji"
		emojiDom.innerText = emoji
		wrapper.appendChild(emojiDom)
	},

	createPropertiesContainer: function (wrapper, props, propNames) {
		const propContainer = document.createElement("div")
		propContainer.id = "mmm-notion-listview-propContainer"
		propNames.forEach(propName => {
			switch (props.properties[propName].type) {
				case "checkbox":
					this.createCheckbox(propContainer, props.properties[propName].checkbox)
					break;
			}
		})
		wrapper.appendChild(propContainer)
	},

	createCheckbox: function (wrapper, value) {
		const checkbox = document.createElement("input")
		checkbox.id = "mmm-notion-listview-checkbox"
		checkbox.setAttribute("type", "checkbox")
		checkbox.checked = value
		wrapper.appendChild(checkbox)
	},

	getScripts: function () {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-Notion.css",
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
		if (notification === "MMM-Notion-DATABASE-DATA") {
			this.databases = payload;
			this.updateDom();
		}
	},
});
