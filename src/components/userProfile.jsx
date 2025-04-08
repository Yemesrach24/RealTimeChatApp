import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { auth } from '../firebase/firebase';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const signOut = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="user-profile p-4 bg-white border border-gray-300 rounded-md shadow-md">
      {user ? (
        <>
          <h3 className="text-lg font-bold">{user.displayName}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <button
            onClick={signOut}
            className="mt-4 w-full p-2 bg-red-500 text-white rounded-md"
          >
            Log Out
          </button>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default UserProfile;
