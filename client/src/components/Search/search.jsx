import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './styles.css'
import BookCard from "../BookCard";


const BookDiscovery = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [authToken, setAuthToken] = useState(""); 

  useEffect(() => {
    const storedAuthToken = localStorage.getItem("token");
    setAuthToken(storedAuthToken);
  }, []); 

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books/discover", {
        params: { keywords: query },
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
    <div>
      <h3>Discover Books</h3>
      <input
        type="text"
        placeholder="Search by keywords"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn" onClick={handleSearch}>Search</button>
      < div className="books_container">
			{books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            authToken={authToken}
          />
			))}
		</div>
    </div>
  );
};

export default BookDiscovery;

