import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatWindow from '../components/Chat/ChatWindow';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarOpen(false); 
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-gray-100 border-r z-50 transition-all duration-300
          ${isSidebarOpen ? 'block fixed inset-y-0 left-0 w-72' : 'hidden'}
          lg:relative lg:block lg:w-72`}
      >
        <Sidebar onUserSelect={handleUserSelect} />
      </div>

      {/* Mobile Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-0 m-0">
        <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col pt-16 lg:pt-0 overflow-y-auto bg-white">
        {selectedUser ? (
          <ChatWindow selectedUser={selectedUser} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select a user to start a conversation
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'block lg:hidden' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default ChatPage;
