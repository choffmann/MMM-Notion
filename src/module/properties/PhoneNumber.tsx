export interface PhoneNumberProps {
  number: number
}

const PhoneNumber = ({number}: PhoneNumberProps) => {
  return (
    <div id="mmm-notion-property-phone_number">
      {number}
    </div>
  )
}

export default PhoneNumber
