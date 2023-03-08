/* Magic Mirror
 * Module: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

class GalleryViewElement {
	constructor(notionProps, config) {
		this.notionProps = notionProps
		this.wrapper = this.createPageWrapper()
		this.config = config
		this.init()
	}

	createPageWrapper() {
		const pageElement = document.createElement("div")
		pageElement.id = "mmm-notion-gallery-element"
		return pageElement
	}

	init() {
		console.log(this.notionProps)
		this.createCover(this.notionProps.cover)
		//this.createTitleWrapper()
		//if (this.config.displayProps.length > 0)
		//	this.createProperties(this.notionProps.properties, this.config.displayProps)
	}

	createTitleWrapper() {
		const titleContainer = document.createElement("div")
		titleContainer.id = "mmm-notion-gallery-cover"
		// this.createIcon(titleContainer, this.notionProps.icon)
		// this.createTitle(titleContainer)
		this.wrapper.appendChild(titleContainer)
	}

	createCover(coverProp) {
		const container = document.createElement("div")
		const cover = document.createElement("img")
		container.id = "mmm-notion-gallery-cover"
		cover.id = "mmm-notion-gallery-cover-img"
		if (coverProp !== null)
			cover.src = coverProp.external.url
		container.appendChild(cover)
		this.wrapper.appendChild(container)
	}

	createTitle(titleContainer, title, icon) {

	}



	findTitleProp(notionProps) {
		for (const key in notionProps) {
			if (notionProps.hasOwnProperty.call(notionProps, key) && notionProps[key].hasOwnProperty('type') && notionProps[key].type === "title") {
				return notionProps[key].title[0].text.content
			}
		}
	}
}
