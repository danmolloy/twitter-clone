export const RightBar = () => {
  return (
    <div id="right-bar" className="hidden lg:flex flex-col items-center w-1/4 mx-4 h-screen">
      <input placeholder="Search Twitter" className="border h-10 w-full m-2 rounded-full bg-gray-100 pl-2" />
      <div className="bg-gray-50 w-full m-2 rounded-2xl">
        <h2 className="font-bold text-lg p-2">Welcome</h2>
        <article className="r-bar-article">
          <p>Hi! My name is Dan, I created this clone of Twitter. To start you off, you are following myself. You can learn more about me by checking out my profile, by clicking on my name or picture. Feel free to unfollow me.</p> 
          <p> You can like, retweet, bookmark or comment on my tweets. Or better yet - post your own! We've already written one on your behalf. Again, feel free to delete this.</p>
        </article>
        <article className="r-bar-article">
          <p>Use the navigation on the left side to explore the app.</p> 
          <p><b>Explore</b> shows a list of users you can interact with.</p>
          <p><b>Notifications</b> will alert you to any new activity on your profile.</p>
          <p>Use <b>Messages</b> to contact other users.</p>
          <p>See a tweet that interests you? Add it to your <b>Bookmarks</b>.</p>
          <p> Check out your own profile! View your information or edit your name and blurb.</p>
        </article>

      </div>
    </div>
  )
}