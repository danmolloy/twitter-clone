import { GlobeIcon, RefreshIcon } from "@heroicons/react/outline"

export const Error = () => {

  const handleClick = () => {
    alert(Object.keys(localStorage))
    window.location.reload()
  }

  return (
    <div id="error-page" className="w-full flex flex-col items-center mt-12">
      <GlobeIcon className="h-6 w-auto"/>
      <p className="text-gray-600">An error occurred. Please check your connection and try again.</p>
      <button className="tweet-btn py-1 flex flex-row" onClick={() => handleClick()}>
        <RefreshIcon className="h-6 w-auto"/>
        <p className="font-semibold px-1">Retry</p>
      </button>
    </div>
  )
}