import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { auth, db } from '../../firebase/config'; 

import { doc, setDoc } from 'firebase/firestore'; 

const SignInModal = () => {
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || '/default-avatar.png', 
      };

     
      await setDoc(doc(db, 'users', user.uid), userData);

  
      dispatch(setUser(userData));
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div>
      <button
  onClick={handleGoogleSignIn}
  className="flex items-center justify-center bg-indigo-200 text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-all focus:outline-none"
>
  <img
    src="https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-png-transparent.png"
    alt="Google Logo"
    className="w-6 h-6 mr-3"
  />
  <span className="text-lg text-gray-700 font-normal font-sans">Sign in with Google</span>
</button>

    </div>
  );
};

export default SignInModal;
