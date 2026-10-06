import mongoose from "mongoose";
import config from "./config.js";

async function ConnectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://tahirpansota796_db_user:MqLxqGfopOdxDLua@cluster0.dctdrhe.mongodb.net",
    );
    console.log("Connected to database");
  } catch (error) {
    console.log("Database connection failed:", error);
    throw error;
  }
}

export default ConnectDB;
