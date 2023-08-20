const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  picture: String,
  review:  String ,
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
