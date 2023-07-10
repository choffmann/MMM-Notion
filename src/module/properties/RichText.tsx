import {RichText} from "../../model/NotionDatabaseProperties.ts";

export interface RichTextProps {
  rich_text: RichText[]
}

const RichText = ({rich_text}: RichTextProps) => {

  const richText = rich_text.map(text => {
    let formattedText = <>{text.text.content}</>
    if (text.annotations.bold)
      formattedText = <strong>{formattedText}</strong>
    if (text.annotations.italic)
      formattedText = <em>{formattedText}</em>
    if (text.annotations.strikethrough)
      formattedText = <del>{formattedText}</del>
    if (text.annotations.underline)
      formattedText = <u>{formattedText}</u>
    if (text.annotations.code)
      formattedText = <code>{formattedText}</code>
    if (text.annotations.color !== "default")
      formattedText = <span style={{color: text.annotations.color}}>{formattedText}</span>
    return formattedText
  })

  return (
    <p id="mmm-notion-property-text">
      {richText}
    </p>
  )
}

export default RichText
