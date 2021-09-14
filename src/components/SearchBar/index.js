import React, { useState, useEffect } from "react";
import "./styles.css";

const SearchBar = ({ handleSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSearchSubmit(searchQuery);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <>
      <input
        type="text"
        className="search-input"
        placeholder="Search for Books"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="search-button"
        data-testid="search-button"
        onClick={() => handleSearchSubmit(searchQuery)}
      >
        Search
      </button>
    </>
  );
};

export default SearchBar;
