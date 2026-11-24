import mongoose from "mongoose";

let notification_schema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    type: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

let NotificationModel = mongoose.model(
  "NotificationModel",
  notification_schema,
);

export default NotificationModel;
