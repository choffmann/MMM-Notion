export interface EmailProps {
  email: string
}

const Email = ({email}: EmailProps) => {
  return (
    <div id="mmm-notion-property-email">
      {email}
    </div>
  )
}

export default Email
