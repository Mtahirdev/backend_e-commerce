import { body } from "express-validator";

let AddProductValidator = [
  body("itemname").trim().notEmpty().withMessage("Item name is required"),
  body("itembrand").trim().notEmpty().withMessage("Item brand is required"),
  body("itemcategory")
    .trim()
    .notEmpty()
    .withMessage("Item category is required"),
  body("itemcolor").trim().notEmpty().withMessage("Item color is required"),
  body("itemdescription")
    .trim()
    .notEmpty()
    .withMessage("Item description is required"),
  body("itemdiscount")
    .trim()
    .notEmpty()
    .withMessage("Item discount is required")
    .isNumeric()
    .withMessage("Item discount must be a number"),
  body("itemprice")
    .trim()
    .notEmpty()
    .withMessage("Item price is required")
    .isNumeric()
    .withMessage("Item price must be a number"),
  body("itemsize").trim().notEmpty().withMessage("Item size is required"),
  body("itemstock")
    .trim()
    .notEmpty()
    .withMessage("Item stock is required")
    .isNumeric()
    .withMessage("Item stock must be a number"),
  body("itemunit").trim().notEmpty().withMessage("Item unit is required"),
];

export default AddProductValidator;
