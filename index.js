const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const bookRouter = require("./routes/bookRoutes");

dotenv.config();

const app = express();


app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/books", bookRouter);

app.get("/", (req, res) => {
  res.status(200).send("working api correctly fine");
});

const port = process.env.SERVER_PORT || 5001;
// const port = 5000;

const connectDb = process.env.MONGODB_ATLAS_URL;
// const connectDb = `mongodb+srv://book-reader-user:CpEr76dhqXB9hf43@cluster0.aoukuaq.mongodb.net/?retryWrites=true&w=majority/test`;

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

app.listen(port, async () => {
  try {
    await connectDataBase();
    console.log(`Server is running on: http://localhost:${port}`);
  } catch (error) {
    console.error("Failed to start server", error.toString());
  }
});

module.exports = app;
