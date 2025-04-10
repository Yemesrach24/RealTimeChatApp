import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => onSearch(e.target.value);

  return (
    <div className="mb-2">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search users..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
