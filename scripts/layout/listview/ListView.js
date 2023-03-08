/* Magic Mirror
 * Module: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

class ListView {
	constructor(databaseProps) {
		this.databaseProps = databaseProps
		this.wrapper = this.createListWrapper()
		this.init()
	}

	init() {
		this.createElements()
	}

	createListWrapper() {
		const list = document.createElement("div")
		list.id = "mmm-notion-listview"
		return list
	}

	createElements() {
		this.databaseProps.data.forEach(props => {
			const config = {
				dateFormat: this.databaseProps.layout.dateFormat,
				showPersonWithNames: this.databaseProps.layout.showPersonWithNames,
				displayProps: this.databaseProps.layout.properties,
				database_id: this.databaseProps.id
			}
			const element = new ListViewElement(props, config)
			this.wrapper.appendChild(element.wrapper)
		})
	}
}
