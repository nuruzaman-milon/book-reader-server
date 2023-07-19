const express = require("express");
const {
  getAllBooks,
  getSingleBook,
  ceateNewBook,
  updateBook,
  deleteBook,
  getAllBooksDesc,
} = require("../controllers/bookController");
const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/", ceateNewBook);
bookRouter.get("/dsc", getAllBooksDesc);
bookRouter
  .get("/:id", getSingleBook)
  .patch("/:id", updateBook)
  .delete("/:id", deleteBook);

module.exports = bookRouter;
