/* Magic Mirror
 * Node Helper: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const Log = require("logger");
const {Client} = require("@notionhq/client")

module.exports = NodeHelper.create({
	start: function () {
		Log.log(`${this.name} is started`);
	},

	socketNotificationReceived: async function (notification, payload) {
		switch (notification) {
			case "HERE_IS_YOUR_CONFIG":
				await this.makeRequest(payload.secret, payload.databases);
				break;
			case "UPDATE_PLEASE":
				await this.makeRequest(payload.secret, payload.databases);
				break;
		}
	},

	makeRequest: async function (secret, databases) {
		const notion = new Client({auth: secret})
		try {
			for (const database of databases) {
				const data = await this.makeQuery(notion, database)
				if (database.data === undefined) database.data = []
				data.results.forEach(e => database.data.push(e))
			}
			this.sendSocketNotification("MMM-Notion-DATABASE-DATA", databases);
		} catch (e) {
			this.handleError(e)
		}
	},

	makeQuery: async function (notion, database) {
		return await notion.databases.query(this.setQueryArguments(database))
	},

	setQueryArguments: function (database) {
		// Check if database.filter is empty
		if (database.filter === undefined || database.filter == null || Object.keys(database.filter).length === 0) {
			return {
				database_id: database.id,
				sorts: database.sorts
			}
		} else {
			return {
				database_id: database.id,
				filter: database.filter,
				sorts: database.sorts
			}
		}
	},

	handleError: function (error) {
		Log.error(error)
		this.sendSocketNotification("MMM-Notion-DATABASE-ERROR", error);
	}
});
