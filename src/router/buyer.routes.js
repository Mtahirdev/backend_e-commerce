import express from "express";
import {
  AddtoCart,
  Deletecartitem,
  FetchBuyerItem,
  Fetchcart,
} from "../controller/buyer.controller.js";

let BuyerRouter = express.Router();

BuyerRouter.get("/buyer/items", FetchBuyerItem);
BuyerRouter.get("/buyer/addcartitem/:id", AddtoCart);
BuyerRouter.get("/buyer/fetchcart", Fetchcart);
BuyerRouter.delete("/buyer/cartitemdelete/:id", Deletecartitem);

export default BuyerRouter;
