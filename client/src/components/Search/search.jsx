import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './styles.css'
import BookCard from "../BookCard";


const BookDiscovery = () => {
  const [searchType, setSearchType] = useState('keywords');
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const storedAuthToken = localStorage.getItem('token');
    setAuthToken(storedAuthToken);
  }, []);

  const handleSearch = async () => {
    try {
      let queryParams = { [searchType]: query };
      if (searchType === 'keywords') {
        queryParams = { ...queryParams, keywords: query };
      }

      const response = await axios.get('http://localhost:8080/api/books/discover', {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-search">
      <h3>Discover Books</h3>
      <input
        type="text"
        placeholder={`Search by ${searchType}`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select className="sel-style" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="keywords">Keywords</option>
        <option value="genre">Genre</option>
        <option value="author">Author</option>
      </select>
      <button className="btn" onClick={handleSearch}>
        Search
      </button>
      <div className="books_container">
        {books.map((book) => (
          <BookCard key={book._id} book={book} authToken={authToken} />
        ))}
      </div>
    </div>
  );
};

export default BookDiscovery;
