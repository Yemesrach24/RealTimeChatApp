import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
//import NotFoundPage from './pages/NotFoundPage';
//import ChatRoom from './components/ChatRoom';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginPage />} />
           <Route path="/chat" element={<ChatPage />} /> 
           {/* <Route path="*" element={<NotFoundPage />} />*/}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
