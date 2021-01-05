interface Props {
  className?: string
}

function Loading(props: Props) {
  const { className } = props
  return (
    <div
      className={`text-center my-5 font-weight-bold text-muted ${className}`}
    >
      Loading...
    </div>
  )
}

export default Loading
