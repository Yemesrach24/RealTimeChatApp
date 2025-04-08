import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';  // Redux slice to store user data
import { signInWithGoogle, auth } from '../firebase/firebase';  // Firebase sign-in method
import { onAuthStateChanged } from 'firebase/auth';  // Firebase method to track auth state changes
import { useNavigate } from 'react-router-dom';  // Use navigate from react-router-dom

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Use navigate hook
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if there's a user already signed in when the page loads
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Dispatch user info to Redux store
        dispatch(setUser({
          uid: user.uid,
          displayName: user.displayName || 'Anonymous',
          email: user.email,
        }));
        navigate('/chat');  // Redirect to chat page after successful login
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();  // Call Google sign-in function
      // Dispatch user info to Redux store
      dispatch(setUser({
        uid: user.uid,
        displayName: user.displayName || 'Anonymous',
        email: user.email,
      }));
      navigate('/chat');  // Redirect to chat page after successful login
    } catch (err) {
      setError(err.message);  // Handle errors (e.g., network issues)
    }
  };

  return (
    <div className="login-page p-6 bg-white rounded-md shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Log in with Google
      </button>

      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default LoginPage;
