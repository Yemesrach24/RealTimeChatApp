import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatRoom from '../components/ChatRoom';
import ChatInput from '../components/ChatInput';
import { selectUser } from '../redux/selector';  // Assuming you have a selector to get the user

const ChatPage = () => {
  const user = useSelector(selectUser);  // Get user from Redux store
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');  // Redirect to login if no user is found
    }
  }, [user, navigate]);

  return (
    !user ? (
      // If no user, return null to prevent rendering
      null
    ) : (
      // If user exists, render the chat components
      <div className="chat-page p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Chat</h1>
        <ChatRoom />
        <ChatInput />
      </div>
    )
  );
};

export default ChatPage;
