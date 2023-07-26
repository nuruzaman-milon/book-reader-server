const express = require("express");
const bookRouter = require("./src/routes/bookRoutes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/books", bookRouter);

app.get("/api/v1/test", (req, res) => {
  res.status(200).send("running correctly testing passed");
});
app.get("/", (req, res) => {
  res.status(200).send("working api correctly fine");
});

const port = process.env.SERVER_PORT || 5001;

const connectDb = process.env.MONGODB_ATLAS_URL;

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
