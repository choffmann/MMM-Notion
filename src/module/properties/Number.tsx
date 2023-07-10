export interface NumberProps {
  number: number
}

const Number = ({number}: NumberProps) => {
  return (
    <div id="mmm-notion-property-number">
      {number}
    </div>
  )
}

export default Number
