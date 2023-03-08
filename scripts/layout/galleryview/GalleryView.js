/* Magic Mirror
 * Module: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

class GalleryView {
	constructor(databaseProps) {
		this.databaseProps = databaseProps
		this.wrapper = this.createGalleryWrapper()
		this.init()
	}

	init() {
		this.createElements()
	}

	createGalleryWrapper() {
		const gallery = document.createElement("div")
		gallery.id = "mmm-notion-gallery"
		return gallery
	}

	createElements() {
		this.databaseProps.data.forEach(props => {
			const config = {
				dateFormat: this.databaseProps.layout.dateFormat,
				showPersonWithNames: this.databaseProps.layout.showPersonWithNames,
				displayProps: this.databaseProps.layout.properties,
				database_id: this.databaseProps.id
			}
			const element = new GalleryViewElement(props, config)
			this.wrapper.appendChild(element.wrapper)
		})
	}
}
