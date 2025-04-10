import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { auth } from '../firebase/config';
import SignInModal from '../components/Auth/SignInModal';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSignInWithGoogle = () => {
    
    console.log('Google Sign-In clicked!');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-green-50">

      {/* Image section*/}
      <div className="mb-6 max-w-xl w-full">
        <img
          src="https://static.vecteezy.com/system/resources/previews/001/236/161/original/business-people-in-group-chat-vector.jpg"
          alt="chatting people"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Welcome Section */}
      <div className="text-center px-4 sm:px-16 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 font-sans">
          Welcome to Chat App
        </h1>
        <p className="text-lg text-gray-600 mb-1 font-sans">
          Stay connected with friends and colleagues in an intuitive and seamless messaging experience.
        </p>
      </div>

        <SignInModal />
    

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center py-4 bg-gray-200 text-gray-600">
        <p>&copy; 2025 Chat App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
