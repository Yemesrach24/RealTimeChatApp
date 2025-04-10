import { useEffect } from 'react';
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

    return () => unsubscribe(); // Clean up on unmount
  }, [dispatch]);

  return (
    <Routes>
      {/* If the user is authenticated, redirect them to /chat */}
      <Route path="/" element={user ? <Navigate to="/chat" /> : <LoginPage />} />
      
      {/* If the user is authenticated, show the ChatPage, otherwise redirect to / */}
      <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
