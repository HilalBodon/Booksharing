import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard";

const RecommendedBooks = ({ authToken }) => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/books/recommended",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setRecommendedBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendedBooks();
  }, [authToken]);

  return (
    <div >
      <h2>Recommended Books</h2>
      <div className="books_container">
        {recommendedBooks.map((book) => (
          <BookCard key={book._id} book={book} authToken={authToken} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedBooks;
