import UserModelAdmin from "../model/useradmin.model.js";
import ItemModel from "../model/item.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import os from "os";
import { validationResult } from "express-validator";
import UserModel from "../model/user.model.js";

export const AddItem = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(400).json({ msg_login: "please Login" });
    }

    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({
        msg_validation: "validation error",
        validation: err.array()[0],
      });
    }

    const access_token = req.headers.authorization?.split(" ")[1];

    if (!access_token) {
      return res.status(400).json({ msg_login: "please Login" });
    }

    const decoded = jwt.verify(access_token, config.jwtsecret);

    const user = await UserModel.findById({ _id: decoded.userId });

    if (!user) {
      return res.status(400).json({ msg_signup: "please signup" });
    }

    let {
      itemname,
      itembrand,
      itemcategory,
      itemcolor,
      itemdescription,
      itemdiscount,
      itemprice,
      itemsize,
      itemstock,
      itemunit,
    } = req.body;

    console.log(req.body);

    let itemimg = req.file?.filename;

    itemimg = `http://localhost:3000/uploads/${itemimg}`;
    console.log(itemimg);

    const item = new ItemModel({
      brand: itembrand,
      productName: itemname,
      category: itemcategory,
      color: itemcolor,
      description: itemdescription,
      discount: itemdiscount,
      price: itemprice,
      size: itemsize,
      stock: itemstock,
      unit: itemunit,
      mainimg: itemimg,
      rating: 0,
      reviews: 0,
    });
    await item.save();

    user.userarray.push(item._id);

    await user.save();

    return res.json({ msg_itemadd: "item add successfully", item });
  } catch (error) {
    console.log(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Token expired" });
    }
    return res.status(500).json({ msgerr: "Internal server error" });
  }
};

export let FetchAdminProduct = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(400).json({ msg_login: "please Login" });
    }

    const access_token = req.headers.authorization?.split(" ")[1];

    if (!access_token) {
      return res.status(400).json({ msg_login: "please Login" });
    }

    const decoded = jwt.verify(access_token, config.jwtsecret);

    const user = await UserModel.findById({ _id: decoded.userId });

    if (!user) {
      return res.status(400).json({ msg_signup: "please signup" });
    }

    let products;

    if (user.type == "seller") {
      products = await ItemModel.find({ _id: { $in: user.userarray } });
    } else {
      products = await ItemModel.find();
    }

    return res.json({ msg_success: "item fetched", products });
  } catch (error) {
    console.log(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Token expired" });
    }
    return res.status(500).json({ msgerr: "Internal server error" });
  }
};

export let DeleteProductAdmin = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(400).json({ msg_login: "please Login" });
    }

    const access_token = req.headers.authorization?.split(" ")[1];

    console.log(access_token, "accesstoken");

    if (!access_token) {
      return res.status(400).json({ msg_login: "please Login" });
    }

    const decoded = jwt.verify(access_token, config.jwtsecret);

    const user = await UserModel.findById({ _id: decoded.userId });

    let { id } = req.params;

    console.log(id);

    if (!user) {
      return res.status(400).json({ msg_signup: "please signup" });
    }
    let item = await ItemModel.findByIdAndDelete(id);

    await user.save();

    let produts = await ItemModel.find({ _id: { $in: user.userarray } });

    return res.json({ msg_delete: "item delete", produts });
  } catch (error) {
    console.log(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Token expired" });
    }
    return res.status(500).json({ msgerr: "Internal server error" });
  }
};

export const UpdateItem = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(400).json({ msg_login: "please Login" });
    }

    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({
        msg_validation: "validation error",
        validation: err.array()[0],
      });
    }

    const access_token = req.headers.authorization?.split(" ")[1];

    if (!access_token) {
      return res.status(400).json({ msg_login: "please Login" });
    }

    const decoded = jwt.verify(access_token, config.jwtsecret);

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ msg_signup: "please signup" });
    }

    const itemfile = req.file?.filename;

    const {
      id,
      itemname,
      itembrand,
      itemprice,
      itemdiscount,
      itemstock,
      itemcolor,
      itemsize,
      itemunit,
      itemcategory,
      itemdescription,
      mainimg,
    } = req.body;

    let itemimg;

    if (itemfile === undefined) {
      itemimg = mainimg;
    } else {
      itemimg = `http://localhost:3000/uploads/${itemfile}`;
    }

    const item = await ItemModel.findByIdAndUpdate(id, {
      $set: {
        brand: itembrand,
        productName: itemname,
        category: itemcategory,
        color: itemcolor,
        size: itemsize,
        unit: itemunit,
        stock: Number(itemstock),
        price: Number(itemprice),
        discount: Number(itemdiscount),
        description: itemdescription,
        mainimg: itemimg,
      },
    });

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await user.save();

    return res.json({
      msg_itemadd: "item update successfully",
      item,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Token expired" });
    }

    return res.status(500).json({ msgerr: "Internal server error" });
  }
};
