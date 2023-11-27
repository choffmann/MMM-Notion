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
		if (this.config.displayProps.length > 0)
			this.createProperties(this.notionProps.properties, this.config.displayProps)
	}


	createProperties(properties, propNames) {
		if (this.checkValidPropName(properties, propNames, this.config.database_id)) return
		const propertyElements = new PropertiesView(this.config, this.notionProps)
		propertyElements.getProperty(properties, propNames)
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
