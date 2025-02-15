import React from 'react';
import { CheckCheck } from 'lucide-react';
import { Message } from '../types';


interface ChatMessageProps {
  message: Message;
  friendID: string
}

export function ChatMessage({ message, friendID }: ChatMessageProps) {

  const isUser = message.senderID !== friendID;
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(message.timestamp);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isUser ? 'bg-gray-100 text-black' : 'bg-white border'
        }`}
      >
        <p className='text-base'>{message.content}</p>
        <div className={`flex items-center justify-between gap-1 text-[9px] mt-1 ${isUser ? 'text-black' : 'text-gray-500'}`}>
          <span>{formattedTime}</span>
          {isUser && (
            <div className="flex">
              <CheckCheck size={20} className={message.status === 'read' ? 'text-blue-400' : 'text-gray-400'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}