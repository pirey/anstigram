import Message from './Message'

interface Props {
  message: string
  onClose?: () => void
}
function ErrorMessage(props: Props) {
  const { message, onClose } = props
  return (
    <Message>
      <span className="text-danger d-block mb-3">{message}</span>
      <button
        onClick={onClose}
        className="btn btn-outline-danger rounded-pill px-5"
      >
        Close
      </button>
    </Message>
  )
}

export default ErrorMessage
