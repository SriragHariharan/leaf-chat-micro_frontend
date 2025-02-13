import { MessageCircleIcon } from 'lucide-react'
import React from 'react';
import '../index.scss'

function MessageButton({ userTwoID } : { userTwoID: string }) {
    const handleClick = () => {
        console.log("Fetching coversation ID for user: " + userTwoID);
        console.log("Redirecting to the chat page....")
    }
    
    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
        >
            <MessageCircleIcon className="h-4 w-4 fill-white" />
            <span className="hidden sm:inline">Message</span>
        </button>
    )
}

export default MessageButton