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
		dateFormat: "full_date", // full_date, month_day_year, day_month_year, year_month_day, relative
		databases: [
			{
				showTitle: true,
				title: "",
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
		const self = this;
		this.databases = [];
		this.status = "loading"
		this.error = ""

		this.sendSocketNotification("HERE_IS_YOUR_CONFIG", this.config);
		setInterval(function () {
			self.sendSocketNotification("UPDATE_PLEASE", self.config);
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
				this.databases.forEach(database => {
					this.createDatabaseView(wrapper, database)
				})
				break;
			case "error":
				wrapper.innerText = this.error
				break
		}

		return wrapper;
	},

	createDatabaseView: function (wrapper, properties) {
		const container = document.createElement("div")
		const databaseTitle = document.createElement("div")
		const divider = document.createElement("hr")
		container.id = "mmm-notion-database"
		databaseTitle.id = "mmm-notion-database-title"
		divider.id = "mmm-notion-database-title-divider"
		databaseTitle.innerText = `${properties.title}:`
		if (properties.showTitle === undefined || properties.showTitle ) {
			container.appendChild(databaseTitle)
			//container.appendChild(divider)
		}
		this.createListView(container, properties)
		wrapper.appendChild(container)
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
					this.createEditTime(propContainer, props.properties[propName].last_edited_time)
					break;
				case "created_time":
					this.createEditTime(propContainer, props.properties[propName].created_time)
					break;
				case "phone_number":
					this.createPhoneNumber(propContainer, props.properties[propName].phone_number)
					break;
				case "created_by":
					if (props.properties[propName].created_by.object === "user")
						this.createPerson(propContainer, props.properties[propName].created_by.avatar_url, props.properties[propName].created_by.name)
					break;
				case "last_edited_by":
					if (props.properties[propName].last_edited_by.object === "user")
						this.createPerson(propContainer, props.properties[propName].last_edited_by.avatar_url, props.properties[propName].last_edited_by.name)
					break;
				case "people":
					this.createMultiPerson(propContainer, props.properties[propName].people)
					break;
				case "email":
					this.createEmail(propContainer, props.properties[propName].email)
					break;
				case "multi_select":
					this.createMultiSelect(propContainer, props.properties[propName].multi_select)
					break;
				case "status":
					this.createStatus(propContainer, props.properties[propName].status)
					break;
				case "date":
					this.createDate(propContainer, props.properties[propName].date)
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

	createEditTime: function (wrapper, value) {
		const date = document.createElement("div")
		date.id = "mmm-notion-listview-last_edited_time"
		date.innerText = this.convertDateToFormat(value)
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

	createMultiSelect: function (wrapper, value) {
		const multiSelect = document.createElement("div")
		multiSelect.id = "mmm-notion-listview-multiselect"
		value.forEach(tag => {
			const element = document.createElement("div")
			element.id = "mmm-notion-listview-multiselect-element"
			element.innerText = tag.name
			element.style.background = tag.color === "default" ? "lightgray" : tag.color
			multiSelect.appendChild(element)
		})
		wrapper.appendChild(multiSelect)
	},

	createStatus: function (wrapper, value) {
		const container = document.createElement("div")
		const text = document.createElement("div")
		const circle = document.createElement("div")
		container.id = "mmm-notion-listview-status"
		circle.id = "mmm-notion-listview-status-circle"
		text.id = "mmm-notion-listview-status-text"
		text.innerText = value.name
		circle.style.backgroundColor = value.color === "default" ? "lightgray" : value.color
		container.appendChild(circle)
		container.appendChild(text)
		wrapper.appendChild(container)
	},

	createDate: function (wrapper, value) {
		if (value == null) return
		const date = document.createElement("div")
		date.id = "mmm-notion-listview-date"
		if (value.start != null && value.end != null) {
			date.innerText = `${this.convertDateToFormat(value.start)} -> ${this.convertDateToFormat(value.end)}`
		} else if (value.start != null && value.end === null) {
			date.innerText = this.convertDateToFormat(value.start)
		}
		wrapper.appendChild(date)
	},

	convertDateToFormat: function (dateString) {
		switch (this.config.dateFormat) {
			case "full_date":
				return convertFullDate(dateString)
			case "month_day_year":
				return convertMonthDayYear(dateString)
			case "day_month_year":
				return convertDayMonthYear(dateString)
			case "year_month_day":
				return convertYearMonthDay(dateString)
			case "relative":
				return convertRelative(dateString)
		}
	},

	getScripts: function () {
		return [
			this.file('scripts/DateFormat.js')
		];
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
			this.status = "success"
			this.updateDom();
		} else if (notification === "MMM-Notion-DATABASE-ERROR") {
			this.status = "error"
			console.log(payload)
			this.error = JSON.parse(payload.body).message
			this.updateDom();
		}
	},
});
