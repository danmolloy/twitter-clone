
export const Bookmarks = () => {

  return (
    <div className="ml-24 border-r w-full mr-2">
      <div className="border-b">
        <h2 className="text-xl font-semibold pl-2 pt-2 pb-0">Bookmarks</h2>
        <p className="user pl-2 -pt-2 text-xs text-gray-600 mb-1.5">@handle</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-1/2 pt-8">
        <h3 className="text-3xl font-bold">
          You haven't added any Tweets to your Bookmarks yet
        </h3>
        <p className="text-s text-gray-600">When you do, they'll show up here.</p>
        </div>
      </div>
    </div>
  )
}