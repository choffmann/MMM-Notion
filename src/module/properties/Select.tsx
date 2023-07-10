export interface SelectProps {
  value: string
  color: string
}

const Select = ({value, color}: SelectProps) => {
  return (
    <div id="mmm-notion-property-select" style={{color: "black", background: color}}>
      {value}
    </div>
  )
}

export default Select
