import { body } from "express-validator";

let SetAddressValidator = [
  body("id").notEmpty().withMessage("id is required").bail(),
];

export default SetAddressValidator;
