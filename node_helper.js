// noinspection JSVoidFunctionReturnValueUsed

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
		this.calls = []
	},

	socketNotificationReceived: async function (notification, payload) {
		switch (notification) {
			case "MMM-NOTION-HERE_IS_YOUR_CONFIG":
				this.calls.push({callId: payload.callId, secret: payload.secret, databases: payload.databases })
				break;
			case "MMM-NOTION-UPDATE_PLEASE":
				const callElement = this.calls.filter(e => e.callId === payload)
				if (callElement.length === 1) {
					const call = callElement[0]
					const databases = await this.makeRequest(call.secret, call.databases, (error) => this.handleError(error, call.callId));
					this.sendSocketNotification(`MMM-Notion-DATABASE-DATA-${call.callId}`, databases);
				}
				break;
		}
	},

	makeRequest: async function (secret, databases, onError) {
		const notion = new Client({auth: secret})
		try {
			for (const database of databases) {
				const data = await this.makeQuery(notion, database)
				if (database.data === undefined) database.data = []
				data.results.forEach(e => database.data.push(e))
			}
			return databases
		} catch (e) {
			onError(e)
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

	handleError: function (error, id) {
		Log.error(error)
		this.sendSocketNotification(`MMM-Notion-DATABASE-ERROR-${id}`, error);
	}
});
