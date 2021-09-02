import { ArrowLeftIcon, CogIcon, PlusSmIcon, SearchIcon } from "@heroicons/react/outline"

export const Messages = () => {
  return (
    <div className="ml-24 border-r w-full mr-2">
      <div className="border-b flex flex-row justify-between">
        <h2 className="text-xl font-semibold pl-3 pt-3 pb-3">Messages</h2>
        <div className="flex flex-row">
          <CogIcon className="w-9 p-1 h-auto hover:bg-gray-300 my-2 rounded-full mr-3"/>
          <PlusSmIcon className="w-9 p1 h-auto hover:bg-gray-300 my-2 rounded-full mr-3"/>
        </div>
      </div>
      <div className="flex flex-row w-full border">
        <ArrowLeftIcon className="w-12 p-2 hover:bg-gray-300 rounded-full h-auto ml-3 my-4" />
        <input className="p-4 border ml-2 h-10 w-11/12 rounded-full my-4 focus:outline-none focus:border-blue-500" placeholder="Search for people or groups">
        </input>
      </div>
      <div className="w-full h-full flex flex-col text-center">
        <p className="text-s text-gray-600 mt-6">Try searching for people or groups</p>
      </div>
    </div>
  )
}