# MMM-Notion

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).
This module shows you your favorite Notion databases on MagicMirror. All you need is to create a [Notion integration](https://www.notion.com/my-integrations), download this module and connect your Notion database. :raised_hands:

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: 'MMM-Notion',
      config: {
        updateInterval: 60000,
        secret: "YOUR_NOTION_SECRET",
        showPersonWithNames: true,
        dateFormat: "full_date", // full_date, month_day_year, day_month_year, year_month_day, relative
        databases: [
          {
            title: "My Notion Database",
            id: "NOTION_DATABASE_ID",
            layout: {
              type: "listview",
              properties: ["Checkbox", "Name"]
            },
            filter: {
              "property": "Task completed",
              "checkbox": {
                "equals": true
              }
            },
            sorts: []
          },
          {
            title: "My other Notion Database",
            id: "NOTION_DATABASE_ID",
            layout: {
              type: "listview",
              properties: ["Date", "Status"]
            }
          }
        ]
      }
    }
  ]
}
```

## Configuration options

| Option                        | Description                                                                                                                                                                                                          |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `secret`                      | *Required* Your Notion secret key goes here                                                                                                                                                                          |
| `updateInterval`              | *Optional* Interval to update Notion database <br><br>**Type:** `int`(milliseconds) <br>Default 60000 milliseconds (1 minute)                                                                                        |
| `showPersonWithNames`         | *Optional* To save space, the name of a person is hidden. But you can enable the name by setting the property to `true` <br><br>**Type:** `boolean` <br>Default `false`                                              |
| `dateFormat`                  | *Optional* Define the date format. You can use the date formats from Notion. <br><br>**Type:** `full_date &#124; month_day_year &#124; day_month_year &#124; year_month_day &#124; relative` <br>Default `full_date` |
| `databases`                   | *Required* List of databases from Notion. Here you can set the title, properties, filter and more for the database                                                                                                   |
| `databases.title`             | *Optional* Title of the database, with will display over the database content. If empty, the title will be ignored                                                                                                   |
| `databases.showTitle`         | *Optional* Option to set a title, but manually hide it <br><br>**Type:** `boolean`<br>Default `true`                                                                                                                 |
| `databases.id`                | *Required* id of the database from Notion                                                                                                                                                                            |
| `databases.layout`            | *Required* Information about the layout to display the database information                                                                                                                                          |
| `databases.layout.type`       | *Required* Set the type of the different views. Unfortunately there is only one view `listview` implemented for now. <br><br>**Type:** `listview`<br>Default `listview`                                              |
| `databases.layout.properties` | *Required* List of Properties, which will displayed on the view. Please use the exact name like in Notion. If leaving empty, there will be no properties visible                                                     |
| `databases.filter`            | *Optional* Here you can set a filter for the database. You can use the exact options from Notion, which are described [here](https://developers.notion.com/reference/post-database-query-filter)                     |
| `databases.sorts`             | *Optional* Like the `filter`, you can specify the order here. You can also use the exact options from Notion, which are described [here](https://developers.notion.com/reference/post-database-query-sort)           |

