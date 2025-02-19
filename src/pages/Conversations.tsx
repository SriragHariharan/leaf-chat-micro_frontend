import React, { useEffect } from 'react';
import type { Conversation } from '../types';
import useAxiosInstance from 'profileMF/useAxiosInstance';
import ConversationCard from '../components/ConversationCard';
import "../index.scss";

const Conversation = () => {
  const [chats, setChats] = React.useState([]);
  const axiosInstance = useAxiosInstance();
  useEffect(() => {
    axiosInstance.get('../chat/conversations')
    .then(resp => setChats(resp?.data?.data?.conversations))
    .catch(err => console.log(err));
  }, [])

  return (
    <div className="min-h-screen max-w-4xl m-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>
      <div className="bg-white rounded-lg shadow">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-600 bg-gray-50">
            <p className='text-lg'>No conversations yet.</p>
          </div>
        ) : (
          chats?.map(conversation => <ConversationCard key={conversation?.chatID} conversation={conversation} /> )
        )}
      </div>
    </div>
  );
};

export default Conversation;