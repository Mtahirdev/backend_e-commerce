import mongoose from "mongoose";

let user_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "auth",
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  useritem: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemModel" }],
});

let UserModelAdmin = mongoose.model("UserModelAdmin", user_schema);

export default UserModelAdmin;
