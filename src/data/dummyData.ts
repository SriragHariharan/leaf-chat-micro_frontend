import { User, Message, Conversation, Notification } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastSeen: new Date(),
    isOnline: true
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    lastSeen: new Date(Date.now() - 1000 * 60 * 15),
    isOnline: false
  },
  {
    id: '3',
    name: 'Carol Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastSeen: new Date(),
    isOnline: true
  }
];

export const messages: Message[] = [
  {
    id: '1',
    senderId: '1',
    content: 'Hey, how are you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60)
  },
  {
    id: '2',
    senderId: 'currentUser',
    content: "I'm doing great! How about you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: '3',
    senderId: '1',
    content: '📦Send you an attachment',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    isImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1695653422715-991ec3a0db7b'
  }
];

export const conversations: Conversation[] = [
  {
    id: '1',
    participants: [users[0]],
    lastMessage: messages[2],
    unreadCount: 2
  },
  {
    id: '2',
    participants: [users[1]],
    lastMessage: {
      id: '4',
      senderId: '2',
      content: 'Are we still meeting tomorrow?',
      timestamp: new Date(Date.now() - 1000 * 60 * 120)
    },
    unreadCount: 1
  },
  {
    id: '3',
    participants: [users[2]],
    lastMessage: {
      id: '5',
      senderId: 'currentUser',
      content: 'Thanks for the help!',
      timestamp: new Date(Date.now() - 1000 * 60 * 240)
    },
    unreadCount: 0
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    content: 'Alice Johnson liked your post',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    userId: '1'
  },
  {
    id: '2',
    type: 'comment',
    content: 'Bob Smith commented on your photo',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    isRead: false,
    userId: '2'
  },
  {
    id: '3',
    type: 'follow',
    content: 'Carol Williams started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    isRead: true,
    userId: '3'
  }
];