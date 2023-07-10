export interface CheckboxProps {
  checked: boolean
}

const Checkbox = ({checked}: CheckboxProps) => {
  return (
    <input id="mmm-notion-property-checkbox" type="checkbox" checked={checked}/>
  )
}

export default Checkbox
