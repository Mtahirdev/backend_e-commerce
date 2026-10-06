import mongoose from "mongoose";
import config from "./config.js";

async function ConnectDB() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Database connection failed:", error);
    throw error;
  }
}

export default ConnectDB;
