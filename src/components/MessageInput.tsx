import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { debounce } from 'lodash'; 

interface MessageInputProps {
  onSendMessage: (content: string, type: 'text' | 'image', file?: File) => void;
  onTyping: () => void;
  onStopTyping: () => void;
}

export function MessageInput({ onSendMessage, onTyping, onStopTyping }: MessageInputProps) {
  const [message, setMessage] = useState('');

  // Debounce function to delay the stopTyping event
  const handleStopTyping = debounce(() => {
    onStopTyping();
  }, 1000); // 1 second delay

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onTyping(); // Notify the server that the user is typing
    handleStopTyping(); // Call stopTyping after a delay
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
      onStopTyping(); // Stop typing as soon as the message is sent
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white p-2 border-t border-gray-200">
      <input
        type="text"
        value={message}
        onChange={handleChange}
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
