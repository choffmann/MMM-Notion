/* Magic Mirror
 * Module: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

class PropertiesView {
	constructor(config) {
		this.wrapper = this.createWrapper()
		this.config = config
	}

	createWrapper() {
		const propContainer = document.createElement("div")
		propContainer.id = "mmm-notion-property"
		return propContainer
	}

	getProperty(notionProps, propNames) {
		propNames.forEach(propName => {
			const property = notionProps[propName]
			switch (property.type) {
				case "checkbox":
					this.createCheckbox(property.checkbox)
					break;
				case "rich_text":
					this.createText(property.rich_text)
					break;
				case "number":
					this.createPhoneNumber(property.number)
					break;
				case "select":
					this.createSelect(property.select.name, property.select.color)
					break;
				case "url":
					this.createUrl(property.url)
					break;
				case "last_edited_time":
					this.createEditTime(property.last_edited_time)
					break;
				case "created_time":
					this.createEditTime(property.created_time)
					break;
				case "phone_number":
					this.createPhoneNumber(property.phone_number)
					break;
				case "created_by":
					if (property.created_by.object === "user")
						this.createPerson(property.created_by.avatar_url, property.created_by.name)
					break;
				case "last_edited_by":
					if (property.last_edited_by.object === "user")
						this.createPerson(property.last_edited_by.avatar_url, property.last_edited_by.name)
					break;
				case "people":
					this.createMultiPerson(property.people)
					break;
				case "email":
					this.createEmail(property.email)
					break;
				case "multi_select":
					this.createMultiSelect(property.multi_select)
					break;
				case "status":
					this.createStatus(property.status)
					break;
				case "date":
					this.createDate(property.date)
					break;
			}
		})
	}

	createCheckbox(value) {
		if (value === null) return
		const checkbox = document.createElement("input")
		checkbox.id = "mmm-notion-property-checkbox"
		checkbox.setAttribute("type", "checkbox")
		checkbox.checked = value
		this.wrapper.appendChild(checkbox)
	}

	createText(value) {
		if (value === null) return
		const text = document.createElement("p")
		text.id = "mmm-notion-property-text"
		value.forEach(t => {
			text.innerHTML += this.formatTextWithAnnotations(t.text.content, t.annotations)
		})
		this.wrapper.appendChild(text)
	}

	formatTextWithAnnotations(text, annotations) {
		let html = text;
		if (annotations.bold)
			html = `<strong>${html}</strong>`;
		if (annotations.italic)
			html = `<em>${html}</em>`;
		if (annotations.strikethrough)
			html = `<del>${html}</del>`;
		if (annotations.underline)
			html = `<u>${html}</u>`;
		if (annotations.code)
			html = `<code>${html}</code>`;
		if (annotations.color !== "default")
			html = `<span style="color: ${annotations.color}">${html}</span>`;
		return html;
	}

	createNumber(value) {
		if (value === null) return
		const number = document.createElement("div")
		number.id = "mmm-notion-property-number"
		number.innerText = value
		this.wrapper.appendChild(number)
	}

	createSelect(value, color) {
		if (value === null) return
		const select = document.createElement("div")
		select.id = "mmm-notion-property-select"
		select.innerText = value
		select.style.background = color
		select.style.color = "black"
		this.wrapper.appendChild(select)
	}

	createUrl(value) {
		if (value === null) return
		const url = document.createElement("a")
		url.id = "mmm-notion-property-url"
		url.href = value
		url.innerText = value
		this.wrapper.appendChild(url)
	}

	createEditTime(value) {
		if (value === null) return
		const date = document.createElement("div")
		date.id = "mmm-notion-property-last_edited_time"
		date.innerText = this.convertDateToFormat(value)
		this.wrapper.appendChild(date)
	}

	createPhoneNumber(value) {
		if (value === null) return
		const phoneNumber = document.createElement("div")
		phoneNumber.id = "mmm-notion-property-phone_number"
		phoneNumber.innerText = value
		this.wrapper.appendChild(phoneNumber)
	}

	createMultiPerson(persons) {
		if (persons === null) return
		if (persons.length > 1) {
			persons.forEach(person => {
				this.createPerson(person.avatar_url, person.name)
			})
		} else {
			this.createPerson(persons[0].avatar_url, persons[0].name)
		}
	}

	createPerson(imageUrl, name) {
		if (name === null) return
		return this.config.showPersonWithNames ?
			this.createPersonChipName(imageUrl, name) :
			this.createPersonChip(imageUrl)
	}

	createPersonChip(imageUrl) {
		if (imageUrl === null) return
		const person = document.createElement("img")
		person.id = "mmm-notion-property-person"
		person.src = imageUrl
		person.width = 20
		person.height = 20
		this.wrapper.appendChild(person)
	}

	createPersonChipName(imageUrl, name) {
		if (name === null) return
		const personContainer = document.createElement("div")
		const personName = document.createElement("div")
		personContainer.id = "mmm-notion-property-person_chip_name"
		personName.id = "mmm-notion-property-person_name"
		personName.innerText = name
		this.createPersonChip(imageUrl)
		personContainer.appendChild(personName)
		this.wrapper.appendChild(personName)
	}

	createEmail(value) {
		if (value === null) return
		const email = document.createElement("div")
		email.id = "mmm-notion-property-email"
		email.innerText = value
		this.wrapper.appendChild(email)
	}

	createMultiSelect(value) {
		if (value === null) return
		const multiSelect = document.createElement("div")
		multiSelect.id = "mmm-notion-property-multiselect"
		value.forEach(tag => {
			const element = document.createElement("div")
			element.id = "mmm-notion-property-multiselect-element"
			element.innerText = tag.name
			element.style.background = tag.color === "default" ? "lightgray" : tag.color
			multiSelect.appendChild(element)
		})
		this.wrapper.appendChild(multiSelect)
	}

	createStatus(value) {
		if (value === null) return
		const container = document.createElement("div")
		const text = document.createElement("div")
		const circle = document.createElement("div")
		container.id = "mmm-notion-property-status"
		circle.id = "mmm-notion-property-status-circle"
		text.id = "mmm-notion-property-status-text"
		text.innerText = value.name
		circle.style.backgroundColor = value.color === "default" ? "lightgray" : value.color
		container.appendChild(circle)
		container.appendChild(text)
		this.wrapper.appendChild(container)
	}

	createDate(value) {
		if (value === null) return
		const date = document.createElement("div")
		date.id = "mmm-notion-property-date"
		if (value.start != null && value.end != null) {
			date.innerText = `${this.convertDateToFormat(value.start)} -> ${this.convertDateToFormat(value.end)}`
		} else if (value.start != null && value.end === null) {
			date.innerText = this.convertDateToFormat(value.start)
		}
		this.wrapper.appendChild(date)
	}

	convertDateToFormat(dateString) {
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
	}
}
