import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, addMessage } from '../../redux/messageSlice';
import { collection, doc, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';

const ChatWindow = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const messages = useSelector((state) => state.messages.messages);

  const chatId = user.uid < selectedUser.uid
    ? `${user.uid}_${selectedUser.uid}`
    : `${selectedUser.uid}_${user.uid}`;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = query(
      collection(doc(db, 'chats', chatId), 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const messageData = doc.data();
        return {
          ...messageData,
          timestamp: messageData.timestamp.toDate().getTime(),
        };
      });
      dispatch(setMessages(fetchedMessages));
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribe();
  }, [selectedUser, user.uid, chatId, dispatch]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage = {
      senderId: user.uid,
      receiverId: selectedUser.uid,
      text: message,
      timestamp: new Date(), 
    };

    const chatRef = collection(doc(db, 'chats', chatId), 'messages');

    try {
      await addDoc(chatRef, newMessage);
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-100 to-white">
   
      <div className="flex items-center gap-3 p-4 border-b bg-white shadow-sm">
        <img
          src={selectedUser.photoURL || '/default-avatar.png'}
          alt={selectedUser.displayName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-800">
            {selectedUser.displayName || selectedUser.email}
          </p>
        </div>
      </div>

   
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === user.uid;
          const time = new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={index}
              className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-3 max-w-sm break-words shadow-sm ${
                  isSender
                    ? 'bg-white text-gray-900 rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-xs text-gray-500 mt-1 text-right">{time}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

     
      <form onSubmit={handleSendMessage} className="flex items-center border-t p-4 bg-white">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="bg-gray-300 text-black px-5 py-2 rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
