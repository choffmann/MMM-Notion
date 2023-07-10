// noinspection JSVoidFunctionReturnValueUsed

/* Magic Mirror
 * Node Helper: MMM-Notion
 *
 * By Cedrik Hoffmann
 * MIT Licensed.
 */

import {NotionDatabaseProps} from "./hooks/useNotionDatabase.ts";
import {Client} from "@notionhq/client";
// @ts-ignore
import {Request, Response} from "express";
import {ApiResponse} from "./model/ApiResponse.ts";
import {QueryDatabaseResponse} from "@notionhq/client/build/src/api-endpoints";

const NodeHelper = require("node_helper")
const Log = require("logger")
const express = require("express")

export interface NotionRequestProps {
  secret: string,
  database: NotionDatabaseProps
}

const makeRequest = async (secret: string, database: NotionDatabaseProps): Promise<ApiResponse<QueryDatabaseResponse>> => {
  const notion = new Client({auth: secret})
  try {
    const notionResponse = await makeQuery(notion, database)
    return {
      data: notionResponse
    }
  } catch (e) {
    return handleError(e)
  }
}

const handleError = (e: any): { error: string } => {
  Log.error(e)
  if (e instanceof TypeError) {
    return {error: "TypeError: " + e.message}
  } else if (e instanceof RangeError) {
    return {error: "RangeError: " + e.message}
  } else if (e instanceof EvalError) {
    return {error: "EvalError: " + e.message}
  } else if (typeof e === "string") {
    return {error: e}
  } else {
    return {error: e};
  }
}

const makeQuery = async (notion: Client, database: NotionDatabaseProps) => {
  return await notion.databases.query(setQueryArguments(database))
}

const setQueryArguments = (database: NotionDatabaseProps) => {
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
}

module.exports = NodeHelper.create({
  start: function () {
    Log.log(`${this.name} is started`);
    Log.debug("Starting express server...")

    this.expressApp.use(express.json())

    this.expressApp.get(`/${this.name.toLowerCase()}`, (_: Request, res: Response) => {
      res.send("Hello form MMM-Notion 👋")
    })

    this.expressApp.post(`/${this.name.toLowerCase()}/database`, (req: Request, res: Response) => {
      const {secret, database}: NotionRequestProps = req.body
      makeRequest(secret, database)
        .then((data: ApiResponse<QueryDatabaseResponse>) => res.send(data))
        .catch((error) => res.send({error}))
    })
  },
})

