import { 
  ArrowLeftIcon, 
  DocumentAddIcon
} from "@heroicons/react/outline"
import { useAppSelector } from "../app/hooks"

export const Lists = () => {
  const user = useAppSelector(state => state.user.user)
  return (
    <div className="border-r w-full mr-2">
      <div className="flex flex-row border-b w-full flex flex-row justify-between items-center ml-24">
        <div className="flex flex-row">
          <ArrowLeftIcon className="w-12 p-2 h-auto rounded-full hover:bg-gray-300  ml-2 my-2"/>
          <div className="ml-4 mt-2">
            <h2 className="text-xl font-semibold pl-2 pt-0 pb-0">Lists</h2>
            <p className="pl-2 -pt-2 text-xs text-gray-600 mb-1.5">{user.handle}</p>
          </div>
        </div>
        <div className="flex flex-row mr-4">
        <DocumentAddIcon className="w-10 p-2 h-auto text-gray-600 hover:bg-gray-300 mr-1 rounded-full" />
        <button className="text-gray-600 rounded-full p-1 mr-2 rounded-full hover:bg-gray-300 p-2">
            •••
        </button>
        </div>
      </div>
    </div>
  )
}