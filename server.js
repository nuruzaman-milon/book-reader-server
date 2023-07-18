// //require app function from app file
// const app = require("./app");

// //require dotenv config file to get .env variable
// require("dotenv").config();

// //1. requre mongoose to connect db using mongoose
// const mongoose = require("mongoose");

// // port
// const port = process.env.SERVER_PORT || 5001;

// //2. dbconnection
// const connectDb =
//   process.env.MONGODB_URL ||
//   "mongodb://localhost:27017/book-reader-server";

// //3. create connect database async function
// const connectDataBase = async (options = {}) => {
//   try {
//     await mongoose.connect(connectDb, options);
//     console.log("Database Connected Successfully");
//     mongoose.connection.on("error", (error) => {
//       console.error("DB connection error", error);
//     });
//   } catch (error) {
//     console.error("Could not connect to DB", error.toString());
//   }
// };

// app.listen(port, async () => {
//   console.log(`server is working on: http://localhost:${port}`);
//   await connectDataBase(); //4.call the connectDb method to connect on app listen
// });
