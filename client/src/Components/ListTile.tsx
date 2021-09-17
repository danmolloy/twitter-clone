import { DocumentTextIcon } from "@heroicons/react/outline"
import { LockClosedIcon } from "@heroicons/react/solid"

export const ListTile = (props: any) => {
  return (
    <div className="px-2 py-2 w-full flex flex-row hover:bg-gray-100">
      <DocumentTextIcon className="w-10 h-auto bg-gray-300"/>
      <div className="flex flex-col pl-2">
        <div className="flex flex-row">
        <p className="font-semibold">{props.ListName}</p>
        {props.private &&
        <LockClosedIcon className="w-4 h-auto"/>}
        </div>
        <div className="flex flex-row">
          <img src={props.Creator.profilePic} className="rounded-full w-4 h-auto "/>
          <p className="mx-1 font-semibold text-sm hover:underline">{props.Creator.name}</p>
          <p className="text-sm text-gray-600">{props.Creator.handle}</p>
        </div>
      </div>
    </div>
  )
}