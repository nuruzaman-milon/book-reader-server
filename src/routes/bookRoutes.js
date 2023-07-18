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

bookRouter.get("/", getAllBooks).post("/", ceateNewBook);
bookRouter.get("/dsc", getAllBooksDesc);
bookRouter
  .get("/:id", getSingleBook)
  .patch("/:id", updateBook)
  .delete("/:id", deleteBook);
// userRouter.delete("/:id", deleteUser)
// userRouter.get("/create",createAllUserToDb)

module.exports = bookRouter;
