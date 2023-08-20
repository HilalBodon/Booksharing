import React, { useState } from "react";
import axios from "axios";

const BookDiscovery = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books/discover", {
        params: { keywords: query },
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Discover Books</h2>
      <input
        type="text"
        placeholder="Search by keywords"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <h3>{book.name}</h3>
            <p>Author: {book.author}</p>
            <p>Review: {book.review}</p>
            {/* Display other book information */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDiscovery;
