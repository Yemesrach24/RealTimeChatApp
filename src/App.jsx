import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
//import NotFoundPage from './pages/NotFoundPage';
//import ChatRoom from './components/ChatRoom';
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice';
import { auth } from './firebase/config';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
       
        dispatch(setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }));
      } else {
       
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe(); 
  }, [dispatch]);

  return (
    <Routes>
   
      <Route path="/" element={user ? <Navigate to="/chat" /> : <LoginPage />} />
      <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;


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
