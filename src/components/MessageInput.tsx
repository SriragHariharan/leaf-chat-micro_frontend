import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, type: 'text' | 'image' | 'video' | 'file', file?: File) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white p-2 border-t border-gray-200">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-green-400"
      />
      <button
        onClick={handleSend}
        className="p-1.5 bg-green-400 text-white rounded-full hover:bg-green-500 transition-colors"
      >
        <Send size={18} />
      </button>
    </div>
  );
}