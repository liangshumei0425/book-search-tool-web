import React from "react";
import "./styles.css";

const SearchResults = ({ searchResults, sortBy }) => {
  let sortedSearchResults = [];
  if (sortBy !== "DEFAULT") {
    // Sort but preserve the orginial order
    sortedSearchResults = [...searchResults].sort((docA, docB) => {
      if (sortBy === "A_TO_Z") return docA.title > docB.title ? 1 : -1;
      if (sortBy === "Z_TO_A") return docA.title > docB.title ? -1 : 11;
      if (sortBy === "OLDEST") return docA.publishedYear - docB.publishedYear;
      if (sortBy === "NEWEST") return docB.publishedYear - docA.publishedYear;
      return 0;
    });
  } else {
    // Load original order
    sortedSearchResults = searchResults;
  }

  return (
    <>
      {sortedSearchResults.length === 0 ? (
        <div>No books found</div>
      ) : (
        <div>
          {sortedSearchResults.map((result, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-left-row">
                  <img src={result.bookCover} alt="BookCover" className="book-cover" />
                </div>
                <div className="card-right-row">
                  <h4>
                    <b>{result.title}</b>
                  </h4>
                  <p>Published in {result.publishedYear.toString()}</p>
                  <p>Author: {result.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchResults;
