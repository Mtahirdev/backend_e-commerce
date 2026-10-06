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
  userarray: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemModel" }],
});

let UserModel = mongoose.model("UserModel", user_schema);

export default UserModel;
