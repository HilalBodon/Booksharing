const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { Book } = require("../models/book");
const { User } = require("../models/user");

// ___________________________________________________
router.post('/',authMiddleware, async (req, res) => {
    try {
      const { name, author, picture, review } = req.body;
      const userId = req.user._id;
      const user = await User.findById(userId);
      const newBook = new Book({user: user, name, author, picture, review, });
      await newBook.save();
      res.status(201).send(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
//   _____________________________________________________

  router.get('/my-books', authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const userBooks = await Book.find({ user: userId });
        res.status(200).send(userBooks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// ________________________________________________________
  router.get('/',authMiddleware, async (req, res) => {
    try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
// _______________________________________________________



module.exports = router;
