import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { useSearchParams } from 'react-router';
import { socket } from '../helpers/socket';
import useStore from "hostApp/GlobalStore";
import useAxiosInstance from 'profileMF/useAxiosInstance';
import { ChatMessage } from '../components/ChatMessage';
import { MessageInput } from '../components/MessageInput';
import '../index.scss';
import { getValidAccessToken } from '../helpers/tokenUtils';

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [friendDetails, setFriendDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { accessToken, refreshToken, setAccessToken, setRefreshToken, logout } = useStore();
  const axiosInstance = useAxiosInstance();

  const conversationID = searchParams.get('conversationID');
  const friendID = searchParams.get('friendID');

  /* connect to a socket and join a room */
  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", conversationID, accessToken);
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [conversationID]);

  /* fetch all chats */
  useEffect(() => {
    axiosInstance.get("../chat/messages/" + conversationID)
      .then(resp => setMessages(resp?.data?.data?.messages))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [conversationID]);

  /* fetch profile details */
  useEffect(() => {
    axiosInstance.get("../chat/profile/" + friendID)
      .then(resp => setFriendDetails(resp?.data?.data?.profile))
      .catch(err => console.log(err));
  }, [friendID]);

  /* typing indicator */
  const [isFriendTyping, setIsFriendTyping] = useState(false);
  useEffect(() => {
    socket.on("userTyping", (userID) => {
      if (userID === friendID) {
        setIsFriendTyping(true);
      }
    });

    socket.on("userStoppedTyping", (userID) => {
      if (userID === friendID) {
        setIsFriendTyping(false);
      }
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [friendID]);

  const handleTyping = () => {
    socket.emit("typing", { room: conversationID, token: accessToken }); // or use userID
  };

  const handleStopTyping = () => {
    socket.emit("stopTyping", { room: conversationID, token: accessToken });
  };

  const handleSendMessage = async (message: string) => {
    if (!message) return;
    const validToken = await getValidAccessToken(accessToken, refreshToken, setAccessToken, setRefreshToken, logout);
    if (!validToken) return;
    socket.emit("sendMessage", { room: conversationID, message, token: validToken, friendID: friendID });
    handleStopTyping();
  };

  /* mark messages as read */
  useEffect(() => {
  socket.on("friendReadMessages", ({ room, userID }) => {
    console.log("Received friendReadMessages event...");
    
    setMessages((prevMessages) =>
      prevMessages.map((message) => ({ ...message, status: 'read' }))
    );
  });

  return () => {
    socket.off("friendReadMessages");
  };
}, [conversationID, friendID]);


  console.log(messages[0])

  return (
    <div className="flex flex-col h-[91vh] bg-white max-w-4xl m-auto">
      <p>{conversationID} ::: {friendID}</p>
      <div className="bg-white border-b p-4 flex items-center gap-4">
        <img
          src={friendDetails?.profilePic}
          alt={friendDetails?.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-sm">{friendDetails?.username}</h2>
          {/* <div className="flex items-center gap-2 text-sm text-gray-500">
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
          </div> */}

          {isFriendTyping && (
            <div className="text-green-500 text-sm">Typing...</div>
          )}

        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading chats...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500">No conversations yet</p>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} friendID={friendID!} />
          ))
        )}
      </div>

      <div className="p-4">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          onTyping={handleTyping} 
          onStopTyping={handleStopTyping} 
        />
      </div>
    </div>
  );
}

export default Chat;
