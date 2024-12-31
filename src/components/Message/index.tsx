type MessageProps = {
  msg: string
  typeMsg: 'error' | 'success'
}

const Message = ({msg, typeMsg}: MessageProps) => {
  return (
    <div data-testId="message" className={'message ' + typeMsg}>
      <p>{msg}</p>
    </div>
  )
}

export default Message