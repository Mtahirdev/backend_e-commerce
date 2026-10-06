import mongoose from "mongoose";

let item_schema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },

  unit: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    default: 0,
  },

  reviews: {
    type: Number,
    required: true,
    default: 0,
  },

  description: {
    type: String,
    required: true,
  },

  mainimg: {
    type: String,
    required: true,
  },

  arrofimg: [],
});

let ItemModel = mongoose.model("ItemModel", item_schema);

export default ItemModel;
