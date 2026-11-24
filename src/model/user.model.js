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

  userarray: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemModel",
    },
  ],

  userdata: {
    profile: {
      img: {
        type: String,
        default: "",
      },
      dateofbirth: {
        type: String,
        default: "",
      },
      number: {
        type: String,
        default: "",
      },
      gender: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      order: {
        type: String,
        default: "",
      },
      spending_or_earning: {
        type: String,
        default: "",
      },
      cartitem: {
        type: String,
        default: "",
      },
      accounttype: {
        type: String,
        default: "",
      },
      refund: {
        type: String,
        default: "",
      },
      netearning: {
        type: String,
        default: "",
      },
      pendingpayment: {
        type: String,
        default: "",
      },
      item_sold_buy: {
        type: String,
        default: "",
      },
    },

    address: [
      {
        addressName: {
          type: String,
          // default: "",
        },
        address: {
          type: String,
          // default: "",
        },
        city: {
          type: String,
          // default: "",
        },
        phoneNumber: {
          type: String,
          // default: "",
        },
        active: {
          type: Boolean,
        },
      },
    ],
  },

  order: [
    {
      date: String,
      state: String,
      paymentMethod: String,
      paymentDetail: mongoose.Schema.Types.Mixed,
      paymentstatus: String,
      items: Array,
      address: mongoose.Schema.Types.Mixed,
      totalPrice: String,
      shipping: mongoose.Schema.Types.Mixed,
      discount: mongoose.Schema.Types.Mixed,
      orderNumber: String,
    },
  ],

  notification: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NotificationModel",
    },
  ],

  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

let UserModel = mongoose.model("UserModel", user_schema);

export default UserModel;
