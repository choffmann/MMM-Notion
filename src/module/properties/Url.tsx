export interface UrlProps {
  value: string
}

const Url = ({value}: UrlProps) => {
  return (
    <a id="mmm-notion-property-url" href={value}>
      {value}
    </a>
  )
}

export default Url
