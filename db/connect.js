require("dotenv").config();
const mongoose = require("mongoose");

const DB_URI = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(DB_URI);
    console.log(
      `DB is connected with this instance: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
