import UserModel from "../model/user.model.js";
import ItemModel from "../model/item.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export let FetchBuyerItem = async (req, res) => {
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

    let products = await ItemModel.find();
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

export let AddtoCart = async (req, res) => {
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

    let { id } = req.params;

    let ida = id;

    const idExists = user.userarray.some((id) => id.equals(ida));

    if (idExists) {
      return res.json({ msg_itemexist: "item already exist" });
    }

    user.userarray.push(id);

    await user.save();

    let item = await ItemModel.findById({ _id: id });

    return res.json({ msg_added: "item is added", item });
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

export const Fetchcart = async (req, res) => {
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
    let item = await ItemModel.find({ _id: { $in: user.userarray } });

    return res.json({ msg_succes: "item addtocart successfully", item: item });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Token expired" });
    }
    console.log(error);

    return res.status(500).json({ msgerr: "Internal server error" });
  }
};

export const Deletecartitem = async (req, res) => {
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
    const { id } = req.params;

    if (user.type !== "buyer") {
      return res
        .status(400)
        .json({ message: "only buyer can delete cart item" });
    }
    user.userarray = user.userarray.filter((ele) => !ele.equals(id));
    await user.save();

    return res.json({ msg_success: "item delete from cart successfully" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Token expired" });
    }
    console.log(error);

    return res.status(500).json({ msgerr: "Internal server error" });
  }
};
