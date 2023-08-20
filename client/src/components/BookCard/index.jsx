import React from "react";
import styles from "./BookCard.module.css"; 

const BookCard = ({ book }) => {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>{book.name}</h3>
        <p className={styles.author}>Author: {book.author}</p>
        <p className={styles.author}>Genre: {book.genre}</p>
        <p className={styles.review}>Review: {book.review}</p>
      </div>
      <div className={styles.img}>
        <img src="https://img.freepik.com/free-vector/abstract-elegant-winter-book-cover_23-2148798745.jpg?size=626&ext=jpg&ga=GA1.1.1165906444.1689373799&semt=ais" alt="BOOK IMAGE" />
      </div>
    </div>
  );
};

export default BookCard;
