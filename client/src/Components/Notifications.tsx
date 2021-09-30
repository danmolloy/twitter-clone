import { Loading } from "./Loading"

export const Notifications = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col border-b">
        <h2 className="text-xl font-semibold pl-3 pt-3 pb-3">
          Notifications
        </h2>
        <div className="flex flex-row">
        <button className="notification-btn-selected">
          All
          <span className="tab-line"/>
          </button>
        <button className="notification-btn">
          Mentions
          <span className="" />
        </button>
        </div>
      </div>
      <div className="w-full h-full">
        <Loading />
      </div>
    </div>
  )
}