import React from 'react';

function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Update searchTerm state
    handleSearch(value); // Call handleSearch function passed from parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
