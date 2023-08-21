import React, { useState ,useEffect } from "react";
import styles from "./BookCard.module.css"; 
import axios from "axios";

const BookCard = ({ authToken, book,userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);



  
  // useEffect(() => {
  //   const fetchUserStatus = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/api/users/status/${userId}/${book._id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );
  //       setIsLiked(response.data.isLiked);
  //       setIsFollowing(response.data.isFollowing);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUserStatus();
  // }, [authToken, userId, book._id]);

// ______________________________________________________________

  const handleLike = async () => {
    try {

      await axios.post(
        `http://localhost:8080/api/books/like/${book._id}`,
        { userId},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setIsLiked(true);
      console.log("Liked!");
    } catch (error) {
      console.error(error);
    }
  };
// _________________________________________________

  const handleUnlike = async () => {
    try {
      await axios.post(
      `http://localhost:8080/api/books/remove-like/${book._id}`,
      { userId},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
      setIsLiked(false);
      console.log("Unliked!");
    } catch (error) {
      console.error(error);
    }
  };

// _________________________________________________________

  const handleFollow = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/users/follow/${userId}`,
        { bookId: book._id },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsFollowing(true);
      console.log("Followed!");
    } catch (error) {
      console.error(error);
    }
  };
// ____________________________________________________________________

  const handleUnfollow = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/users/unfollow/${userId}`,
        { bookId: book._id },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsFollowing(false);
      console.log("Unfollowed!");
    } catch (error) {
      console.error(error);
    }
  };
// ______________________________________________________________

  return (
    <div className={styles.card}>
      <div className={styles.incard}>
        <div>
          <h3 className={styles.title}>{book.name}</h3>
          <p className={styles.author}>Author: {book.author}</p>
          <p className={styles.author}>Genre: {book.genre}</p>
          <div className={styles.review + (book.review.length > 80 ? " " + styles.scrollable : "")}>
          {book.review}
          </div>
        </div>

      </div>
      <div className={styles.img}>
          <img src={book.picture} alt="BOOK" />
        </div>
      <div className={styles.btns}>
        {isFollowing ? (
          <button className={styles.followButton} onClick={handleUnfollow}>- Unfollow</button>
        ) : (
          <button className={styles.followButton} onClick={handleFollow}>+ Follow</button>
        )}
        {isLiked ? (
          <button className={styles.likeButton} onClick={handleUnlike}>Unlike</button>
        ) : (
          <button className={styles.likeButton} onClick={handleLike}>Like</button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
