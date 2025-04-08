import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'; // Correct imports
import { firestore } from '../firebase/firebase';  // Correct firestore import
import { setMessages } from '../redux/messagesSlice'; // Redux action to set messages
import { selectMessages } from "../redux/selector";
import Message from './Message'; // Message component to display each message

const ChatRoom = () => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);  // Use selector to get messages

  useEffect(() => {
    // Using Firestore with the modular approach
    const messagesCollection = collection(firestore, 'messages');  // Get reference to the 'messages' collection
    const messagesQuery = query(messagesCollection, orderBy('createdAt', 'asc'));  // Query for ordering by 'createdAt'

    // Subscribe to the 'messages' collection
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => doc.data()); // Extract data from snapshot
      dispatch(setMessages(messagesData)); // Dispatch messages to Redux
    });

    return () => unsubscribe(); // Clean up the subscription when the component is unmounted
  }, [dispatch]);

  return (
    <div className="chat-room p-4 space-y-4 max-h-[400px] overflow-y-auto border border-gray-300 rounded-md shadow-lg">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default ChatRoom;
