import React, { useState } from "react";
import axios from "axios";
import styles from "./AddBookForm.module.css";

const AddBookForm = ({ authToken, onBookAdded, setShowAddBookForm }) => {
    const [formData, setFormData] = useState({
    name: "",
    author: "",
    genre: "",
    picture: "",
    review: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/books",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const newBook = response.data;
      setFormData({
        name: "",
        author: "",
        genre: "",
        picture: "",
        review: "",
      });

      onBookAdded(newBook);
      setShowAddBookForm(false);

    } catch (error) {
      console.error(error);
    }
  };

  const handlePictureChange = (url) => {
    setFormData({ ...formData, picture: url });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Book</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) =>
            setFormData({ ...formData, author: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Genre"
          value={formData.genre}
          onChange={(e) =>
            setFormData({ ...formData, genre: e.target.value })
          }
        />
        <input
        type="text"
        placeholder="Image URL"
        value={formData.picture}
        onChange={(e) => handlePictureChange(e.target.value)}
        />

        <textarea
          placeholder="Review"
          value={formData.review}
          onChange={(e) =>
            setFormData({ ...formData, review: e.target.value })
          }
        />
        <button type="submit" className={styles.addButton}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
