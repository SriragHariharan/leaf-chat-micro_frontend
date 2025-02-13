import React from 'react';
import type { Conversation } from '../types';
import { conversations } from '../data/dummyData';
import ConversationCard from '../components/ConversationCard';

const Conversation = () => {
  const [chats, setChats] = React.useState<Conversation[]>(conversations);

  return (
    <div className="min-h-screen max-w-4xl m-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>
      <div className="bg-white rounded-lg shadow">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-600 bg-gray-50">
            <p className='text-lg'>No conversations yet.</p>
          </div>
        ) : (
          chats.map(conversation => <ConversationCard key={conversation.id} conversation={conversation} /> )
        )}
      </div>
    </div>
  );
};

export default Conversation;