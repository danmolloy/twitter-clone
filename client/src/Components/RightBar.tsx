export const RightBar = () => {
  return (
    <div id="right-bar" className="hidden lg:flex flex-col items-center w-1/4 mx-4 h-screen">
      <input placeholder="Search Twitter" className="border h-10 w-full m-2 rounded-full bg-gray-100 pl-2" />
      <div className="bg-gray-50 w-full m-2 rounded-2xl">
        <h2 className="font-bold text-lg p-2">What's happening</h2>
        <article className="r-bar-article">
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
        </article>
        <article className="r-bar-article">
          <p>Et harum quidem rerum facilis est et expedita distinctio</p>
        </article>
        <article className="r-bar-article">
          <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus</p>
        </article>
        <article className="r-bar-article">
          <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus</p>
        </article>
      </div>
      <div className="w-full bg-gray-50 p-2 rounded-2xl">
        <h2 className="font-bold text-lg">Who to follow</h2>
        <div>
        Nam libero tempore
        </div>
      </div>
    </div>
  )
}