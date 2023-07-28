const { errorResponse, successResponse } = require("../helpers/response");
const BookModel = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  try {
    const search = req.query.search || ""; //get search query data
    const searchRegEx = new RegExp(".*" + search + ".*", "i"); //match search data with regular expression
    const filter = {
      $or: [
        //search with this field
        { title: { $regex: searchRegEx } },
        { author: { $regex: searchRegEx } },
        { genre: { $regex: searchRegEx } },
      ],
    };

    const books = await BookModel.find(filter);

    if (!books) {
      return errorResponse(res, 404, "books not found");
    }
    return successResponse(res, 201, "Books returned successfully", books);
  } catch (error) {
    return errorResponse(res, 404, `books error happen: ${error}`);
  }
};
const getAllBooksDesc = async (req, res) => {
  try {
    const books = await BookModel.find({}).sort({ createdAt: -1 }).limit(10);

    if (!books) {
      return errorResponse(res, 404, "books not found");
    }
    return successResponse(res, 201, "Books returned successfully", books);
  } catch (error) {
    return errorResponse(res, 404, `books error happen: ${error}`);
  }
};

const getSingleBook = async (req, res) => {
  try {
    const id = req.params.id;

    const books = await BookModel.findById(id);

    if (!books) {
      return errorResponse(res, 404, `There is no books with ${id} id`);
    }
    return successResponse(res, 201, "Book returned successfully", books);
  } catch (error) {
    return errorResponse(res, 404, `books error happen: ${error}`);
  }
};

const ceateNewBook = async (req, res) => {
  try {
    console.log("data from body",req.body);
    const createBook = await BookModel.create(req.body);

    if (createBook) {
      return successResponse(res, 201, "Book created successfully", createBook);
    }
  } catch (error) {
    return errorResponse(res, 404, `books error happen: ${error}`);
  }
};

const updateBook = async (req, res) => {
  try {
    const data = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data before updating
    });

    if (!data) {
      return `addressBook Id: ${req.params.id} not found!`;
    }
    res.status(200).json({
      success: true,
      message: "book details updated successfully",
      data,
    });
  } catch (error) {
    res.status(422).json({
      success: false,
      message: `🔴 book can't able to update successfully. ${error}`,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedBooks = await BookModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedBooks) {
      return res.status(404).json({
        success: false,
        message: `🔴 book ID ${id} not found!`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      deletedBooks,
    });
  } catch (err) {
    res.status(422).json({
      success: false,
      message: `🔴 Failed to delete book: ${err}`,
    });
  }
};

module.exports = {
  getAllBooks,
  getAllBooksDesc,
  getSingleBook,
  ceateNewBook,
  updateBook,
  deleteBook,
};
