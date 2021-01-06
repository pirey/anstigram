import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

function Message(props: Props) {
  const { children, className = '' } = props
  return (
    <div
      className={`text-center my-5 font-weight-bold text-muted ${className}`}
    >
      {children}
    </div>
  )
}

export default Message
