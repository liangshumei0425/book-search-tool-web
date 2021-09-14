import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import axios from "axios";
import "./styles.css";

const getBooks = async (searchQuery, limit, page) => {
  const parsedSearchQuery = searchQuery.replace(/\s+/g, "+").toLowerCase().trim();
  const results = await axios.get(
    `${process.env.REACT_APP_OPEN_LIBRARY_API_ENDPOINT}/search.json?q=${parsedSearchQuery}&limit=${limit}&page=${page}`
  );
  const formatedResults = results?.data?.docs.map((doc) => {
    return {
      title: doc.title_suggest ? doc.title_suggest : doc.title,
      bookCover: `${process.env.REACT_APP_OPEN_LIBRARY_COVERS_API_ENDPOINT}/b/id/${doc.cover_i}-M.jpg`,
      author: doc.author_name ? doc.author_name[0] : "N/A",
      publishedYear: doc.publish_year ? Math.min(...doc.publish_year) : "N/A",
      key: doc.key
    };
  });

  // TODO: remove pagination debug
  console.log(`${searchQuery} - ${page} - ${limit} / ${results.data.num_found}`);

  return {
    books: formatedResults,
    numFound: results.data.num_found
  };
};

const Home = () => {
  const PAGE_SIZE = 10;

  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("DEFAULT");
  const [searchQueryMem, setSearchQueryMem] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const handleSearchSubmit = async (searchQuery) => {
    const { books, numFound } = await getBooks(searchQuery, PAGE_SIZE, 1);

    setTotalCount(numFound);
    setSearchQueryMem(searchQuery);
    setCurrentPage(1);
    setSearchResults(books);
  };

  const handlePreviousPageOnClick = async () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;

    const { books } = await getBooks(searchQueryMem, PAGE_SIZE, prevPage);
    setCurrentPage(prevPage);
    setSearchResults(books);
  };

  const handleNextPageOnClick = async () => {
    const { books } = await getBooks(searchQueryMem, PAGE_SIZE, currentPage + 1);
    setCurrentPage(currentPage + 1);
    setSearchResults(books);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>The Book Search</h1>
      </div>
      <div className="search-bar-container">
        <SearchBar handleSearchSubmit={handleSearchSubmit} />
      </div>
      {searchResults.length > 0 && (
        <div className="sort-by-container">
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => handlePreviousPageOnClick()}
          >
            Previous Page
          </button>
          <button
            className="page-button"
            disabled={currentPage * PAGE_SIZE >= totalCount}
            onClick={() => handleNextPageOnClick()}
          >
            Next Page
          </button>

          <select
            className="sort-by-dropdown"
            defaultValue="DEFAULT"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="DEFAULT">Sort By</option>
            <option value="A_TO_Z">Title (A-Z)</option>
            <option value="Z_TO_A">Title (Z-A)</option>
            <option value="OLDEST">Publish Year (oldest)</option>
            <option value="NEWEST">Publish Year (newest)</option>
          </select>
        </div>
      )}
      <div className="search-results-container">
        <SearchResults searchResults={searchResults} sortBy={sortBy} />
      </div>
    </div>
  );
};

export default Home;
