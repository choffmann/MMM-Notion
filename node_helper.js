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
const express = require("express")

module.exports = NodeHelper.create({
	start: function () {
		Log.log(`${this.name} is started`);
		Log.debug("Starting express server...")

		this.expressApp.use(express.json())
		this.expressApp.post(`/${this.name.toLowerCase()}/database`, (req, res) => {
			const {secret, databases} = req.body
			this.makeRequest(secret, databases)
				.then(data => res.send(data));
		})
	},

	makeRequest: async function (secret, databases) {
		const notion = new Client({auth: secret})
		try {
			return await Promise.all(databases.map(async database => {
				return await this.makeQuery(notion, database)
			}))
		} catch (e) {
			Log.error(e)
			return e
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

	stop: function () {
		Log.log(`Shutting down ${this.name}`)
	}
});
