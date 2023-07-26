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
bookRouter.get("/msc", (req, res) => {
  res.status(200).send("testing passsed");
});
bookRouter
  .get("/:id", getSingleBook)
  .patch("/:id", updateBook)
  .delete("/:id", deleteBook);

module.exports = bookRouter;
