import { GlobeIcon, RefreshIcon } from "@heroicons/react/outline"
import { AUTH_TOKEN } from '../../constants'


export const Error = () => {

  const handleClick = () => {
    localStorage.removeItem(AUTH_TOKEN)
    window.location.reload()
  }

  return (
    <div id="error-page" className="w-full flex flex-col items-center mt-12">
      <GlobeIcon className="h-6 w-auto"/>
      <p className="text-gray-600">An error occurred. Please check your connection and try again.</p>
      <button className="tweet-btn py-1 flex flex-row" onClick={() => window.location.reload()}>
        <RefreshIcon className="h-6 w-auto"/>
        <p className="font-semibold px-1">Retry</p>
      </button>
      <button className="tweet-btn py-1 flex flex-row" onClick={() => handleClick()}>
        <p className="font-semibold px-1">Sign in again</p>
      </button>
    </div>
  )
}