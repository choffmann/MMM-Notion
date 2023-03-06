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
		showPersonWithNames: false,
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
		this.createTitleEmoji(titleContainer, props.icon)
		this.createTitle(titleContainer, this.findTitleProp(props.properties))
		wrapper.appendChild(titleContainer)
	},

	createTitle: function (wrapper, title) {
		const titleDom = document.createElement("div")
		titleDom.id = "mmm-notion-listview-title"
		titleDom.innerText = title
		wrapper.appendChild(titleDom)
	},

	createTitleEmoji: function (wrapper, icon) {
		if (icon === null) return;
		const emojiDom = document.createElement("div")
		emojiDom.id = "mmm-notion-listview-emoji"
		emojiDom.innerText = icon.emoji
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
				case "number":
					this.createNumber(propContainer, props.properties[propName].number)
					break;
				case "select":
					this.createSelect(propContainer, props.properties[propName].select.name, props.properties[propName].select.color)
					break;
				case "url":
					this.createUrl(propContainer, props.properties[propName].url)
					break;
				case "last_edited_time":
					this.createLastEdit(propContainer, props.properties[propName].last_edited_time)
					break;
				case "phone_number":
					this.createPhoneNumber(propContainer, props.properties[propName].phone_number)
					break;
				case "created_by":
					this.createPerson(propContainer, props.properties[propName].created_by.avatar_url, props.properties[propName].created_by.name)
					break;
				case "people":
					this.createMultiPerson(propContainer, props.properties[propName].people)
					break;
				case "email":
					this.createEmail(propContainer, props.properties[propName].email)
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

	createText: function (wrapper, value) {
		const text = document.createElement("div")
		text.id = "mmm-notion-listview-text"
		text.innerText = value
		wrapper.appendChild(text)
	},

	createNumber: function (wrapper, value) {
		const number = document.createElement("div")
		number.id = "mmm-notion-listview-number"
		number.innerText = value
		wrapper.appendChild(number)
	},

	createSelect: function (wrapper, value, color) {
		const select = document.createElement("div")
		select.id = "mmm-notion-listview-select"
		select.innerText = value
		select.style.background = color
		select.style.color = "black"
		wrapper.appendChild(select)
	},

	createUrl: function (wrapper, value) {
		const url = document.createElement("div")
		url.id = "mmm-notion-listview-url"
		url.innerText = value
		wrapper.appendChild(url)
	},

	createLastEdit: function (wrapper, value) {
		const date = document.createElement("div")
		date.id = "mmm-notion-listview-last_edited_time"
		date.innerText = new Date(value).toLocaleDateString()
		wrapper.appendChild(date)
	},

	createPhoneNumber: function (wrapper, value) {
		const phoneNumber = document.createElement("div")
		phoneNumber.id = "mmm-notion-listview-phone_number"
		phoneNumber.innerText = value
		wrapper.appendChild(phoneNumber)
	},

	createMultiPerson: function (wrapper, persons) {
		if (persons.length > 1) {
			persons.forEach(person => {
				this.createPerson(wrapper, person.avatar_url, person.name)
			})
		} else {
			this.createPerson(wrapper, persons[0].avatar_url, persons[0].name)
		}
	},

	createPerson: function (wrapper, imageUrl, name) {
		this.config.showPersonWithNames ?
			this.createPersonChipName(wrapper, imageUrl, name) :
			this.createPersonChip(wrapper, imageUrl)
	},

	createPersonChip: function (wrapper, imageUrl) {
		const person = document.createElement("img")
		person.id = "mmm-notion-listview-person"
		person.src = imageUrl
		person.width = 20
		person.height = 20
		wrapper.appendChild(person)
	},

	createPersonChipName: function (wrapper, imageUrl, name) {
		const personContainer = document.createElement("div")
		const personName = document.createElement("div")
		personContainer.id = "mmm-notion-listview-person_chip_name"
		personName.id = "mmm-notion-listview-person_name"
		personName.innerText = name
		this.createPersonChip(personContainer, imageUrl)
		personContainer.appendChild(personName)
		wrapper.appendChild(personContainer)
	},

	createEmail: function (wrapper, value) {
		const email = document.createElement("div")
		email.id = "mmm-notion-listview-email"
		email.innerText = value
		wrapper.appendChild(email)
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
