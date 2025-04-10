import React, { useState } from 'react';
import { auth } from '../../firebase/config'; 
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/userSlice'; 
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 

const UserProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); 

  const handleLogout = () => {
    auth.signOut(); 
    dispatch(resetUser()); 
  };

  return (
    <div className="relative bg-gray-100 p-4 rounded-lg shadow-sm">
      {/* User Profile Header */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <img
            src={user?.photoURL || '/default-avatar.png'}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col ml-2">
          <span className="font-semibold text-gray-800">{user?.displayName}</span>
        </div>
        <span className="ml-auto text-gray-600">
          {isDropdownOpen ? (
            <FaChevronUp className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </span>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* User Details */}
          <div className="p-4 border-b border-gray-200">
            <p className="font-semibold text-gray-700">User Profile</p>
            <div className="flex items-center gap-4 mt-2">
              <div>
                <p className="text-sm text-gray-500">Name: {user?.displayName}</p>
                <p className="text-sm text-gray-500">Email: {user?.email}</p>
              </div>
            </div>
          </div>

          {/* Account Settings Dropdown */}
          <div>
            <div
              className="p-4 border-b border-gray-200 cursor-pointer flex justify-between items-center"
              onClick={() => setIsAccountSettingsOpen(!isAccountSettingsOpen)}
            >
              <p className="font-semibold text-gray-700">Account Settings</p>
              <span className="text-gray-600">
                {isAccountSettingsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {/* Account Settings List */}
            {isAccountSettingsOpen && (
              <ul className="text-sm text-gray-600 space-y-2 mt-2 pl-6">
                <li className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">Update Status</li>
                <li className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">Privacy Settings</li>
              </ul>
            )}
          </div>

          {/* More Options Dropdown */}
          <div>
            <div
              className="p-4 border-b border-gray-200 cursor-pointer flex justify-between items-center"
              onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
            >
              <p className="font-semibold text-gray-700">More Options</p>
              <span className="text-gray-600">
                {isMoreOptionsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {/* More Options List */}
            {isMoreOptionsOpen && (
              <ul className="text-sm text-gray-600 space-y-2 mt-2 pl-6">
                <li className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">Help & Support</li>
                <li className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">Terms & Privacy</li>
              </ul>
            )}
          </div>

          {/* Logout Option */}
          <div
            className="cursor-pointer p-4 text-center text-sm text-red-500 hover:bg-gray-100 rounded-b-lg"
            onClick={handleLogout}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
