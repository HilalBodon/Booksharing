import BookDiscovery from "./search";
import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard";

const Main = ({ authToken }) => {

  	const [books, setBooks] = useState([]);
	const handleLogout = () => {
	  localStorage.removeItem("token");
	  window.location.reload();
	};

   useEffect(() => {
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


	return (
	  <div className={styles.main_container}>
		<nav className={styles.navbar}>
		  <h1>ShareBook</h1>
		  <button className={styles.white_btn} onClick={handleLogout}>
			Logout
		  </button>
		</nav>

		<BookDiscovery authToken={authToken} />

		<div className={styles.books_container}>
			{books.map((book) => (
			<BookCard key={book._id} book={book} />
			))}
		</div>

	  </div>
	);
  };

export default Main;
