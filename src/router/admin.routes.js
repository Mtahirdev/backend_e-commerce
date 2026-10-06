import express from "express";
import multer from "multer";
import {
  AddItem,
  DeleteProductAdmin,
  FetchAdminProduct,
  UpdateItem,
} from "../controller/admin.controller.js";
import AddProductValidator from "../validator/addProduct.validator.js";

let AdminRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\\/g, "_").replace(/\s/g, "_");
    cb(null, Date.now() + "-" + safeName);
  },
});

const upload = multer({ storage });

AdminRouter.post(
  "/admin/additem",
  upload.single("itemimg"),
  AddProductValidator,
  AddItem,
);
AdminRouter.get("/admin/getproducts", FetchAdminProduct);
AdminRouter.delete("/admin/deleteproduct/:id", DeleteProductAdmin);
AdminRouter.post(
  "/admin/updateitem",
  upload.single("itemimg"),
  AddProductValidator,
  UpdateItem,
);

export default AdminRouter;
