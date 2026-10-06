import mongoose from "mongoose";
import config from "./config.js";

const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tahirpansota796_db_user:MqLxqGfopOdxDLua@cluster0.dctdrhe.mongodb.net",
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
