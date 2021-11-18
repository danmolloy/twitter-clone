import { GlobeIcon, RefreshIcon } from "@heroicons/react/outline"
import { useState } from "react"

export const Error = () => {
  const [retryCount, setRetryCount] = useState(0)

  const handleClick = () => {
    setRetryCount(retryCount + 1);
    if (retryCount > 1) {
      localStorage.clear();
    }
    window.location.reload()
  }

  return (
    <div id="error-page" className="w-full flex flex-col items-center mt-12">
      <GlobeIcon className="h-6 w-auto"/>
      <p className="text-gray-600">An error occurred. Please check your connection and try again.</p>
      <button className="tweet-btn py-1 flex flex-row" onClick={() => handleClick()}>
        <RefreshIcon className="h-6 w-auto"/>
        <p className="font-semibold px-1">{retryCount === 0 ? "Retry" : "Reboot"}</p>
      </button>
    </div>
  )
}