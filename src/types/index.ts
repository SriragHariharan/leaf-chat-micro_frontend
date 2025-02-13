export interface User {
  id: string;
  name: string;
  avatar: string;
  lastSeen: Date;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isImage?: boolean;
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  content: string;
  timestamp: Date;
  isRead: boolean;
  userId: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'video' | 'file';
  fileUrl?: string;
}

// export interface User {
//   id: string;
//   name: string;
//   avatar: string;
//   status: 'online' | 'offline';
//   lastSeen?: Date;
//   isTyping: boolean;
// }