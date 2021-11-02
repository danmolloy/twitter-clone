export const ChatMessage = (props: any) => {
  return (
    <>
    {props.currentUser.handle === props.message.authorHandle 
    ? <div className="flex flex-row m-1 justify-end">
    <div 
      className="py-1 px-4 m-4 max-w-xxs rounded-full text-center bg-twitter-blue text-white">
      <p>{props.message && props.message.messageText}</p>
    </div>
  </div>
  :<div className="flex flex-row m-1  items-center">
      <img 
        src={props.message 
        && `${props.message.author.profilePic}`} 
        className="rounded-full w-12 h-12" 
      />
      <div 
        className="py-1 px-4 m-4 max-w-xxs rounded-full text-center bg-gray-100">
        <p>{props.message && props.message.messageText}</p>
      </div>
    </div>}
    </>
  )
}