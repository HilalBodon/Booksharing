require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");

// connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// const port = process.env.PORT || 8080;
// app.listen(port, console.log(`Listening on port ${port}...`));

mongoose.set('strictQuery', true);//to avoid warning

const CONNECTION_URL = 'mongodb+srv://hilalbodon:R9z02rrjaF8XPKXs@memoriesproject.9h9nwxs.mongodb.net/';
const PORT = process.env.PORT ||8080;
// mongodb+srv://hilalbodon:R9z02rrjaF8XPKXs@memoriesproject.9h9nwxs.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})//second parameter is not required just for avoid some warnings
    .then(()=> app.listen(PORT,()=>console.log(`server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));
