const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

//express body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "html");

//dotenv for sensitive credentials
require("dotenv/config");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DLETE");
    return res.status(200).json({});
  }
  next();
});

//Connecting to mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection to database established.");
  })
  .catch((err) => {
    console.log(`msg: ${err}`);
  });

//Import mongoose models
const UserModel = require("./models/UserModel");

// Routes
app.get("/newuser", (req, res) => {
  res.send("hello");
});

app.post("/newuser", (req, res) => {
  console.log("Received data");
  const User = new UserModel(req.body);
  User.save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

// Port listener
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
