import { body } from "express-validator";

let AddressValidator = [
  body("addressName").notEmpty().withMessage("Address Name is required").bail(),
  body("address").notEmpty().withMessage("Address is required").bail(),
  body("city").notEmpty().withMessage("City is required").bail(),
  body("phoneNumber")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 characters")
    .bail(),
];

export default AddressValidator;
