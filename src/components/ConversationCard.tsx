import React from 'react'
import { Conversation } from '../types'
import { Circle } from 'lucide-react'

function ConversationCard({ conversation }: { conversation: Conversation }) {
  return (
    <div
        key={conversation.id}
        className="p-4 border-b border-gray-100 hover:bg-green-50 cursor-pointer transition-colors"
        >
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <img
                        src={conversation.participants[0].avatar}
                        alt={conversation.participants[0].name}
                        loading='lazy'
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.participants[0].isOnline && (
                        <Circle className="w-3 h-3 text-green-500 absolute bottom-0 right-0 fill-current" />
                    )}
                </div>
                <div>
                    <p className="font-semibold text-gray-800 text-base">
                        {conversation.participants[0].name}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                        {conversation.lastMessage.content}
                    </p>
                </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">
                        {new Date(conversation.lastMessage.timestamp).toLocaleTimeString()}
                    </p>
                    {conversation.unreadCount > 0 && (
                        <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
                        {conversation.unreadCount}
                        </span>
                    )}
                </div>
        </div>
    </div>
  )
}

export default ConversationCard