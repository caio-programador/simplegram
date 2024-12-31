type MessageProps = {
  msg: string
  typeMsg: 'error' | 'success'
}

const Message = ({msg, typeMsg}: MessageProps) => {
  return (
    <div data-testid="message" className={'message ' + typeMsg}>
      <p>{msg}</p>
    </div>
  )
}

export default Message