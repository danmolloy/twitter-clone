import { DocumentTextIcon } from "@heroicons/react/outline"
import { LockClosedIcon } from "@heroicons/react/solid"
import { List } from '../types'

export const ListTile = (props: {list: List | undefined}) => {
  return (
    <div className="px-2 py-2 w-full flex flex-row hover:bg-gray-100 list-tile">
      <DocumentTextIcon className="w-10 h-auto"/>
      <div className="flex flex-col pl-2">
        <div className="flex flex-row">
        <p className="font-semibold">{props.list && props.list.name}</p>
        {props.list &&
        <LockClosedIcon className="w-4 h-auto"/>}
        </div>
        <div className="flex flex-row">
          <img src={props.list && props.list.author.profilePic} className="rounded-full w-4 h-auto "/>
          <p className="mx-1 font-semibold text-sm hover:underline">{props.list && props.list.author.name}</p>
          <p className="text-sm text-gray-600">{props.list && props.list.authorHandle}</p>
        </div>
      </div>
    </div>
  )
}