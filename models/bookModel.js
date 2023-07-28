const { Schema, model } = require("mongoose");

//defining schema
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is missing"], //boolean, message
    },
    author: {
      type: String,
      required: [true, "author is required"],
    },
    genre: {
      type: String,
      required: [true, "genre is required"],
    },
    publication: {
      type: Date,
      // required: [true, "publication is required"],
    },
  },
  { timestamps: true }
);

// defining model
const BookModel = model("Books", bookSchema);
module.exports = BookModel;
