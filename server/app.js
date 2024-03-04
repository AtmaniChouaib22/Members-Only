require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("error connecting to the database", error);
  }
}

const sessionStore = new MongoStore({
  mongoUrl: MONGO_URI,
  collection: "sessions",
});

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res) => {
  console.log(req.session);
  res.send("Hello World");
});

connectDB();
