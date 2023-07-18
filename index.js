const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./src/routes/bookRoutes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/books", bookRouter);

app.get("/", (req, res) => {
  res.status(200).send("running correctly");
});

const port = process.env.SERVER_PORT || 5001;

const connectDb =
  process.env.MONGODB_URL || "mongodb://localhost:27017/book-reader-server";

const connectDataBase = async (options = {}) => {
  try {
    await mongoose.connect(connectDb, options);
    console.log("Database Connected Successfully");
    mongoose.connection.on("error", (error) => {
      console.error("DB connection error", error);
    });
  } catch (error) {
    console.error("Could not connect to DB", error.toString());
  }
};

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(port, async () => {
  try {
    await connectDataBase();
    console.log(`Server is running on: http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to start server", error.toString());
  }
});

module.exports = app;
