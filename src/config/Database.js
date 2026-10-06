import mongoose from "mongoose";
import config from "./config.js";

const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mawaissultan07_db_user:y2ywDjXWnGf12eA3@cluster0.qcv3mex.mongodb.net",
      {
        serverSelectionTimeoutMS: 10000,
      },
    );

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

export default ConnectDB;
