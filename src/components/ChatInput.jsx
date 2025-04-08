import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/messagesSlice';
import { firestore } from '../firebase/firebase'; // Make sure this import is correct
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Ensure Firestore methods are correctly imported

const ChatInput = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Make sure user data is available
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;  // Prevent message sending if user is not logged in
    }
    if (message.trim()) {
      const newMessage = {
        text: message,
        uid: user.uid,  // This line causes the error if user is null
        displayName: user.displayName,
        createdAt: serverTimestamp(),  // Use Firestore server timestamp
      };

      try {
        // Send message to Firestore
        await addDoc(collection(firestore, 'messages'), newMessage);
        dispatch(addMessage(newMessage));  // Dispatch message to Redux store
        setMessage('');  // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };

  return (
    <div className="chat-input flex items-center space-x-2 mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="w-4/5 p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={sendMessage}
        className="w-1/5 p-2 bg-blue-500 text-white rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
