// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Message, User } from '../types'; // Assuming these types are defined in your types.ts
import { useSearchParams } from 'react-router';
import { socket } from '../helpers/socket';

// Import necessary components and icons
import { Circle } from 'lucide-react';
import { ChatMessage } from '../components/ChatMessage';
import { MessageInput } from '../components/MessageInput';

// Import global styles
import '../index.scss';

/*
 * Chat component that handles real-time messaging between two users.
 */
function Chat() {
  // Initialize state variables
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchParams] = useSearchParams();

  // Get conversation ID and friend ID from search parameters
  const conversationID = searchParams.get('conversationID');
  const friendID = searchParams.get('friendID');

  // Define the other user's details
  const otherUser: User = {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'online',
    isTyping: true,
    isOnline: true
  };

  /**
   * Effect hook that handles socket connection and event listeners.
   */
  useEffect(() => {
    // Connect to the socket
    socket.connect();

    // Join the specified room
    socket.emit("joinRoom", conversationID);

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up event listeners and disconnect from socket when component unmounts
    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [conversationID]);

  /*
   * Handles sending a message to the other user.
  */
  const handleSendMessage = (message: string) => {
    if (message) {
      socket.emit("sendMessage", { room: conversationID, message });
    }
  };

  return (
    // Chat container
    <div className="flex flex-col h-[91vh] bg-white max-w-4xl m-auto">
      {/* Header */}
      <p>{conversationID} ::: {friendID}</p>
      <div className="bg-white border-b p-4 flex items-center gap-4">
        <img
          src={otherUser.avatar}
          alt={otherUser.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-sm">{otherUser.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Circle
              size={8}
              fill={otherUser.status === 'online' ? '#22c55e' : '#gray-400'}
              className={otherUser.status === 'online' ? 'text-green-500' : 'text-gray-400'}
            />
            {otherUser.isTyping ? (
              <span className="text-green-500">typing...</span>
            ) : (
              <span>{otherUser.status}</span>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* Input */}
      <div className="p-4">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chat;