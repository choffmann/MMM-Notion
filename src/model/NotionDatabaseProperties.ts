declare type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red";
declare type PropertyType = "title" | "number" | "checkbox" | "rich_text" | "select" | "url" | "last_edited_time" | "created_time" | "phone_number" | "created_by" | "last_edited_by" | "people" | "email" | "multi_select" | "status" | "date"


export interface NotionDatabase {
  object: string,
  results: NotionDatabaseResult[],
  next_cursor: any,
  has_more: boolean,
  type: string,
  page: Page
}

export interface NotionDatabaseResult {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: string
    id: string
  }
  last_edited_by: {
    object: string
    id: string
  }
  cover?: Cover
  icon: Icon
  parent: Parent
  archived: boolean
  properties: NotionProperty
  url: string
  public_url?: string
}

export interface NotionProperty {
  id: string,
  type: PropertyType,

  [key: string]: any
}

export interface Cover extends NotionProperty {
  type: PropertyType
  external: {
    url: string
  }
}

export interface Icon extends NotionProperty {
  type: PropertyType
  emoji: string
}

export interface Parent extends NotionProperty {
  type: PropertyType
  database_id: string
}

export interface Number extends NotionProperty {
  id: string
  type: PropertyType
  number: number
}

export interface Select extends NotionProperty {
  id: string
  type: PropertyType
  select: {
    id: string
    name: string
    color: SelectColor
  }
}

export interface Checkbox extends NotionProperty {
  id: string
  type: PropertyType
  checkbox: boolean
}

export interface Url extends NotionProperty {
  id: string
  type: PropertyType
  url: string
}

export interface LastEditedTime extends NotionProperty {
  id: string
  type: PropertyType
  last_edited_time: string
}

export interface Phone extends NotionProperty {
  id: string
  type: PropertyType
  phone_number: string
}

export interface CreatedBy extends NotionProperty {
  id: string
  type: PropertyType
  created_by: PersonBy
}

export interface PersonBy extends NotionProperty {
  object: string
  id: string
  name: string
  avatar_url: string
  type: PropertyType
  person: Person
}

export interface Person {
  email: string
}

export interface Email extends NotionProperty {
  id: string
  type: PropertyType
  email: string
}

export interface LastEditedBy extends NotionProperty {
  id: string
  type: PropertyType
  last_edited_by: PersonBy
}

export interface Text extends NotionProperty {
  id: string
  type: PropertyType
  rich_text: RichText[]
}

export interface RichText extends NotionProperty {
  type: PropertyType
  text: RichTextOptions
  annotations: TextAnnotations
  plain_text: string
  href: any
}

export interface RichTextOptions {
  content: string
  link: any
}

export interface TextAnnotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red" | "gray_background" | "brown_background" | "orange_background" | "yellow_background" | "green_background" | "blue_background" | "purple_background" | "pink_background" | "red_background"
}

export interface Date extends NotionProperty {
  id: string
  type: PropertyType
  date?: DateOptions
}

export interface DateOptions {
  start: string
  end: string
  time_zone: string
}

export interface CreatedTime extends NotionProperty {
  id: string
  type: PropertyType
  created_time: string
}

export interface Tags extends NotionProperty {
  id: string
  type: PropertyType
  multi_select: MultiSelect[]
}

export interface MultiSelect extends NotionProperty {
  id: string
  name: string
  color: string
}

export interface FilesMedia extends NotionProperty {
  id: string
  type: PropertyType
  files: File[]
}

export interface File extends NotionProperty {
  name: string
  type: PropertyType
  file: {
    url: string
    expiry_time: string
  }
}

export interface Status extends NotionProperty {
  id: string
  type: PropertyType
  status: StatusOptions
}

export interface StatusOptions {
  id: string
  name: string
  color: string
}

export interface Title extends NotionProperty {
  id: string
  type: PropertyType
  title: {
    type: string
    text: {
      content: string
      link: any
    }
    annotations: TextAnnotations
    plain_text: string
    href: any
  }
}

export interface Page {
}
