import express from "express";
import {
  Active_Address,
  Add_Address,
  AddtoCart,
  Deletecartitem,
  Edit_profile,
  FetchBuyerItem,
  Fetchcart,
  User_profile_image,
  PlaceOrder,
  FetchBuyerItemAuth,
} from "../controller/buyer.controller.js";
import multer from "multer";
import Edit_profile_validation from "../validator/Edit_Profile.validator.js";
import AddressValidator from "../validator/Addaddress.validator.js";
import SetAddressValidator from "../validator/SetAddressValidator.js";
import paymentValidation from "../validator/payment.validator.js";
import { CheckVerify } from "../middleware/CheckVerify.js";

let BuyerRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\\/g, "_").replace(/\s/g, "_");
    cb(null, Date.now() + "-" + safeName);
  },
});

const upload = multer({ storage });

BuyerRouter.get("/buyer/items", FetchBuyerItem);
BuyerRouter.get("/buyer/addcartitem/:id", AddtoCart);
BuyerRouter.get("/buyer/fetchcart", Fetchcart);
BuyerRouter.delete("/buyer/cartitemdelete/:id", Deletecartitem);
BuyerRouter.post(
  "/buyer/profile-img",
  upload.single("img"),
  User_profile_image,
);
BuyerRouter.post(
  "/buyer/edit-profile",
  express.json(),
  Edit_profile_validation,
  Edit_profile,
);
BuyerRouter.post(
  "/buyer/add-address",
  express.json(),
  AddressValidator,
  Add_Address,
);

BuyerRouter.post(
  "/buyer/set-address",
  express.json(),
  SetAddressValidator,
  Active_Address,
);

BuyerRouter.post("/buyer/order", express.json(), paymentValidation, PlaceOrder);
BuyerRouter.get("/buyer/itemauth", FetchBuyerItemAuth);

export default BuyerRouter;
