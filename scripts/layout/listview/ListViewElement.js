/* Magic Mirror
 * Module: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

class ListViewElement {
	constructor(notionProps, config) {
		this.notionProps = notionProps
		this.wrapper = this.createPageWrapper()
		this.config = config
		this.init()
	}

	createPageWrapper() {
		const pageElement = document.createElement("div")
		pageElement.id = "mmm-notion-listview-element"
		return pageElement
	}

	init() {
		this.createTitleWrapper()
		if (this.config.displayProps.length > 0)
			this.createProperties(this.notionProps.properties, this.config.displayProps)
	}

	createTitleWrapper() {
		const titleContainer = document.createElement("div")
		titleContainer.id = "mmm-notion-listview-titleContainer"
		this.createIcon(titleContainer, this.notionProps.icon)
		this.createTitle(titleContainer)
		this.wrapper.appendChild(titleContainer)
	}

	createTitle(titleContainer) {
		const titleDom = document.createElement("div")
		titleDom.id = "mmm-notion-listview-title"
		titleDom.innerText = this.findTitleProp(this.notionProps.properties)
		titleContainer.appendChild(titleDom)
	}

	findTitleProp(notionProps) {
		for (const key in notionProps) {
			if (notionProps.hasOwnProperty.call(notionProps, key) && notionProps[key].hasOwnProperty('type') && notionProps[key].type === "title") {
				return notionProps[key].title[0].text.content
			}
		}
	}

	createIcon(titleContainer, icon) {
		if (icon === null || icon.type === "external") return
		const emojiDom = document.createElement("div")
		emojiDom.id = "mmm-notion-listview-emoji"
		emojiDom.innerText = icon.emoji
		titleContainer.appendChild(emojiDom)
	}

	createProperties(notionProps, propNames) {
		if (this.checkValidPropName(notionProps, propNames, this.config.database_id)) return
		const propertyElements = new PropertiesView(this.config)
		propertyElements.getProperty(notionProps, propNames)
		this.wrapper.appendChild(propertyElements.wrapper)
	}

	checkValidPropName(notionProps, names, database_id) {
		let notfound = false
		names.forEach(name => {
			if (notionProps[name] === undefined) {
				this.wrapper.innerText = `Can't find property '${name}' in database '${database_id}'`
				return true
			}
		})
		return notfound
	}
}
