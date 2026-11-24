import UserModel from "../model/user.model.js";
import ItemModel from "../model/item.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { validationResult } from "express-validator";
import { generateOrderNumber } from "../utils/utils.js";
import OrderModel from "../model/order.model.js";
import NotificationModel from "../model/notification.model.js";
import { getReceiverSocketId, io } from "../socket.js";

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

export const User_profile_image = async (req, res) => {
  console.log(req);

  try {
    const itemimg = req.file?.filename;

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

    if (!itemimg) {
      return res.status.json({ msg_img: "img is not found" });
    }
    user.userdata.profile.img = `http://localhost:3000/uploads/${itemimg}`;
    await user.save();

    return res.json({ msg_success: "img save", user: user });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Token expired" });
    }
    return res.status(500).json({ msgerr: "Internal server error" });
  }
};

export const Edit_profile = async (req, res) => {
  console.log(req.body);

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

    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({
        msg_validation: "validation error",
        validation: err.array()[0],
      });
    }

    const {
      username,
      email,
      dateofbirth,
      number,
      gender,
      state,
      country,
      city,
    } = req.body;

    const updateData = {
      username,
      "userdata.profile.dateofbirth": dateofbirth,
      "userdata.profile.number": number,
      "userdata.profile.gender": gender,
      "userdata.profile.state": state,
      "userdata.profile.country": country,
      "userdata.profile.city": city,
    };

    // Only change email + verification if email is actually changed
    if (email !== "" && email !== user.email) {
      updateData.email = email;
      updateData.verified = false;
    }

    await UserModel.findByIdAndUpdate(
      decoded.userId,
      {
        $set: updateData,
      },
      { new: true },
    );

    let newuser = await UserModel.findById({ _id: decoded.userId });

    return res.json({
      msg: "msg_success",
      user: newuser,
    });
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

export const Add_Address = async (req, res) => {
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

    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({
        msg_validation: "validation error",
        validation: err.array()[0],
      });
    }

    const { addressName, address, city, phoneNumber } = req.body;

    user.userdata.address.push({
      addressName,
      address,
      city,
      phoneNumber,
      active: false,
    });

    await user.save();

    let newuser = await UserModel.findById({ _id: decoded.userId });

    return res.json({
      msg: "msg_success",
      user: newuser,
    });
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

export const Active_Address = async (req, res) => {
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

    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({
        msg_validation: "validation error",
        validation: err.array()[0],
      });
    }

    const { id } = req.body;

    console.log(id);

    let arr = user.userdata.address.filter((ele) => ele._id == id);
    let arr2 = user.userdata.address.filter((ele) => ele._id != id);

    arr[0].active = true;

    arr2.forEach((ele) => {
      ele.active = false;
    });

    await user.save();

    console.log(arr[0]);

    let distanc = null;
    let shippingFee = null;

    async function getdistance(cityone, citytwo) {
      const url = new URL("https://nominatim.openstreetmap.org/search");

      url.searchParams.set("q", cityone);
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("limit", "1");

      const response = await fetch(url, {
        headers: {
          "User-Agent": "ShoppyEcommerce/1.0 (your-contact-email)",
        },
      });

      if (!response.ok) {
        throw new Error("Geocoding request failed");
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("City not found");
      }

      const latitude = Number(data[0].lat);
      const longitude = Number(data[0].lon);

      console.log({ latitude, longitude });

      let a1 = { latitude, longitude };

      const url2 = new URL("https://nominatim.openstreetmap.org/search");

      url2.searchParams.set("q", citytwo);
      url2.searchParams.set("format", "jsonv2");
      url2.searchParams.set("limit", "1");

      const response2 = await fetch(url2, {
        headers: {
          "User-Agent": "ShoppyEcommerce/1.0 (your-contact-email)",
        },
      });

      if (!response2.ok) {
        throw new Error("Geocoding request failed");
      }

      const data2 = await response2.json();

      if (data2.length === 0) {
        throw new Error("City not found");
      }

      const latitude2 = Number(data2[0].lat);
      const longitude2 = Number(data2[0].lon);

      console.log({ latitude2, longitude2 });

      let a2 = { latitude2, longitude2 };

      function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers

        const toRadians = (degrees) => (degrees * Math.PI) / 180;

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
      }

      const distance = calculateDistance(
        a1.latitude,
        a1.longitude,
        a2.latitude2,
        a2.longitude2,
      );

      console.log(Math.round(distance), "km");
      const url3 = `https://router.project-osrm.org/route/v1/driving/${a1.longitude},${a1.latitude};${a2.longitude2},${a2.latitude2}?overview=false`;

      const response3 = await fetch(url3);
      let data3 = await response3.json();

      if (data3.code === "Ok") {
        console.log("Road distance:", data3.routes[0].distance / 1000, "km");
        console.log(
          "Driving duration:",
          data3.routes[0].duration / 3600,
          "hours",
        );
        return data3.routes[0].distance / 1000;
      } else {
        console.log("Route error:", data3.code);
      }
    }

    distanc = await getdistance("Lahore", arr[0].city);

    console.log(distanc);

    if (distanc > 0 && distanc < 100) {
      shippingFee = 200;
    } else if (distanc > 100 && distanc < 200) {
      shippingFee = 200;
    } else if (distanc > 200 && distanc < 300) {
      shippingFee = 300;
    } else if (distanc > 300 && distanc < 400) {
      shippingFee = 300;
    } else if (distanc > 400 && distanc < 500) {
      shippingFee = 400;
    } else if (distanc > 500 && distanc < 600) {
      shippingFee = 500;
    } else if (distanc > 600 && distanc < 1000) {
      shippingFee = 600;
    } else if (distanc > 1000) {
      shippingFee = "out of range";
      return res.status(400).json({ msg_range: "Out of Range" });
    }

    let newuser = await UserModel.findById({ _id: decoded.userId });

    return res.json({
      msg: "msg_success",
      user: newuser,
    });
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

export const PlaceOrder = async (req, res) => {
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

    const user = await UserModel.findById({
      _id: decoded.userId,
    });

    if (!user) {
      return res.status(400).json({ msg_signup: "please signup" });
    }

    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({
        msg_validation: "validation error",
        validation: err.array()[0],
      });
    }

    const date = new Date();

    const currentDate = `${date.getFullYear()}/${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;

    const { data, items, address, discount, state, shipping, total, method } =
      req.body;

    let orderNumber = generateOrderNumber();

    let paymentstatus = true;

    if (method == "Cash On Delivery") {
      paymentstatus = false;
    }

    // ==========================================
    // MAIN CUSTOMER ORDER
    // ==========================================

    let order = new OrderModel({
      date: currentDate,
      state: "pending",
      paymentMethod: method,
      paymentDetail: data,
      paymentstatus,
      items,
      address,
      totalPrice: total,
      shipping,
      discount,
      orderNumber,
    });

    await order.save();

    user.order.push(order._id);

    await user.save();

    // ==========================================
    // GROUP ITEMS BY SELLER
    // ==========================================

    const sellerOrders = {};

    for (const ele of items) {
      const seller = await UserModel.findOne({
        userarray: ele._id,
        type: "seller",
      });

      if (!seller) {
        continue;
      }

      const sellerId = seller._id.toString();
      console.log(sellerOrders[sellerId]);

      // If seller doesn't exist in sellerOrders,
      // create seller entry
      if (!sellerOrders[sellerId]) {
        sellerOrders[sellerId] = {
          seller: seller,
          items: [],
        };
      }

      // Add product to this seller's items
      sellerOrders[sellerId].items.push(ele);
    }

    // ==========================================
    // CREATE ONE ORDER PER SELLER
    // ==========================================

    for (const sellerId in sellerOrders) {
      const seller = sellerOrders[sellerId].seller;
      const sellerItems = sellerOrders[sellerId].items;

      let sellerTotalPrice = 0;

      // Calculate total for this seller
      for (const ele of sellerItems) {
        const item = await ItemModel.findById(ele._id);

        if (!item) {
          continue;
        }

        let discountPrice = item.price * (item.discount / 100);

        let finalPrice = item.price - discountPrice;

        finalPrice = ele.qyt * finalPrice;

        sellerTotalPrice += finalPrice;

        sellerTotalPrice -= shipping;

        item.stock = item.stock - 1;

        await item.save();
      }

      // Seller's single order
      const newOrder = {
        date: currentDate,
        state: "pending",
        paymentMethod: method,
        paymentDetail: data,
        paymentstatus,
        items: sellerItems,
        address,
        totalPrice: sellerTotalPrice,
        shipping,
        discount,
        orderNumber,
      };

      // Add ONE order to seller
      seller.order.push(newOrder);

      let msg = `New Order Placed ${orderNumber} Ready it for shipping`;

      let notification = new NotificationModel({
        receiverId: seller._id,
        type: "order",
        text: msg,
      });

      await notification.save();

      seller.notification.push(notification._id);

      await seller.save();

      console.log(seller.order);

      let socketId = getReceiverSocketId(seller._id);

      io.to(socketId).emit("notification", {
        notification,
        order: seller.order,
      });
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    let newuser = await UserModel.findById({ _id: decoded.userId });

    let orderarr = await OrderModel.find({ _id: { $in: user.order } });

    // console.log(orderarr);

    return res.json({
      msg: "msg_success",
      user: newuser,
      order: orderarr,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        msg: "Token expired",
      });
    }

    console.log(error);

    return res.status(500).json({
      msgerr: "Internal server error",
    });
  }
};

export let FetchBuyerItemAuth = async (req, res) => {
  try {
    let products = await ItemModel.find();
    return res.json({ msg_success: "item fetched", products });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msgerr: "Internal server error" });
  }
};
