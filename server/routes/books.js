const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { Book } = require("../models/book");


router.post('/', async (req, res) => {
    try {
      const { name, author, picture, review } = req.body;
      const userId = req.user.id;
      const newBook = new Book({ name, author, picture, review,user: userId });
      await newBook.save();
      res.status(201).send(newBook);
    } catch (error) {
      console.error(error); // Log the error to the console for debugging
      res.status(500).send({ message: "Internal Server Error" });
    }
  });


  router.get('/',authMiddleware, async (req, res) => {
    try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
