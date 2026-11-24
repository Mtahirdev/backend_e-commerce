import mongoose from "mongoose";

let order_schema = new mongoose.Schema({
  items: [],
  date: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentDetail: {
    type: Object,
  },
  paymentstatus: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
});

let OrderModel = mongoose.model("OrderModel", order_schema);

export default OrderModel;
