import express from "express";
import multer from "multer";
import {
  AddItem,
  DeleteProductAdmin,
  FetchAdminProduct,
  FetchSellerOrder,
  UpdateItem,
} from "../controller/admin.controller.js";
import AddProductValidator from "../validator/addProduct.validator.js";

let AdminRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});
AdminRouter.post(
  "/admin/additem",
  upload.array("itemimg", 4), // was upload.single
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
AdminRouter.get("/admin/fetchorder", FetchSellerOrder);

export default AdminRouter;
