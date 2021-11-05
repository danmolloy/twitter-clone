export const RightBar = () => {
  return (
    <div id="right-bar" className="hidden lg:flex flex-col items-center w-1/4 mx-4 h-screen">
      <div className="bg-gray-50 w-full m-2 rounded-2xl">
        <h2 className="font-bold text-lg p-2">Welcome</h2>
        <article className="r-bar-article">
          <p>Hi! My name is Dan, I created this clone of Twitter. To start you off, you are following myself. Check out my profile by clicking on my name on my tweets. Feel free to unfollow me.</p> 
          <p> You can like, retweet or comment on my tweets. Or better yet - post your own! We've already written one on your behalf.</p>
        </article>
        <article className="r-bar-article">
          <p>Use the navigation on the left side to explore the app.</p> 
          <p><b>Explore</b> shows a list of all users.</p>
          <p><b>Notifications</b> will alert you to any new activity on your profile.</p>
          <p><b>Messages</b> is where you can send direct messages to other users.</p>
          <p> Check out your own profile! View your information or edit your name, picture or blurb.</p>
          <p>When finished, you can either <b>sign out</b> or <b>delete</b> your account.</p>
        </article>
      </div>
    </div>
  )
}