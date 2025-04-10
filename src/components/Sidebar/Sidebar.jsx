import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import SearchBar from './SearchBar';
import UserProfile from './UserProfile';

const Sidebar = ({ onUserSelect }) => {
  const currentUser = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!currentUser) return;

    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const allUsers = usersSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((u) => u.uid !== currentUser.uid);
      setUsers(allUsers);
    };

    fetchUsers();
  }, [currentUser]);

  const handleSearch = (value) => setSearch(value.toLowerCase());

  const filteredUsers = users.filter(
    (user) =>
      user.displayName?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search)
  );

  return (
    <div className="w-72 bg-white h-full p-4 border-r shadow-lg flex flex-col">
      <UserProfile />
      <SearchBar onSearch={handleSearch} />
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      <ul className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <li
            key={user.uid}
            className="py-2 px-2 border-b border-gray-200 cursor-pointer hover:bg-blue-50 rounded"
            onClick={() => onUserSelect(user)}
          >
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || '/default-avatar.png'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.png';
                }}
                alt={user.displayName}
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-sm">{user.displayName || user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
