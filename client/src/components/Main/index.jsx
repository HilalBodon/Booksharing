import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard";
import AddBookForm from "../AddBookForm";
import jwt_decode from "jwt-decode";
import RecommendedBooks from "../RecommendedBooks";
import BookDiscovery from "../Search/search";
import styles from "./styles.module.css";

const Main = ({ authToken }) => {
  const [userId, setUserId] = useState(null);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [showRecommended, setShowRecommended] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const decodedToken = jwt_decode(authToken);
    const fetchedUserId = decodedToken._id;
    setUserId(fetchedUserId);

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [authToken]);

  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>ShareBook</h1>
        <button
          className={styles.btn}
          onClick={() => setShowAddBookForm(!showAddBookForm)}
        >
          + Add New Book
        </button>
        <button
          className={styles.btn}
          onClick={() => setShowRecommended(!showRecommended)}
        >
          {showRecommended ? "All Books" : "Recommended Books"}
        </button>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.search_add}>
        <BookDiscovery authToken={authToken} />
      </div>

      <div className={styles.books_container}>
        {showRecommended ? (
          <RecommendedBooks authToken={authToken} />
        ) : (
          books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              authToken={authToken}
              userId={userId}
            />
          ))
        )}
      </div>

      {!showAddBookForm && (
        <AddBookForm
          authToken={authToken}
          onBookAdded={handleBookAdded}
          setShowAddBookForm={setShowAddBookForm}
        />
      )}
    </div>
  );
};

export default Main;

