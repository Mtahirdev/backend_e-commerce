import { body } from "express-validator";

const paymentValidation = [
  body("method")
    .isIn(["Credit/Debt Card", "Jazz Cash", "Easypaisa", "Cash On Delivery"])
    .withMessage("Invalid payment method"),

  body("data.card-number")
    .if(body("method").equals("Credit/Debt Card"))
    .notEmpty()
    .withMessage("Card number is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Card number must be 16 digits"),

  body("data.cvv")
    .if(body("method").equals("Credit/Debt Card"))
    .notEmpty()
    .withMessage("CVV is required")
    .isLength({ min: 3, max: 4 })
    .withMessage("Invalid CVV"),

  body("data.mobile-number")
    .if(body("method").equals("Jazz Cash"))
    .notEmpty()
    .withMessage("JazzCash number is required")
    .isLength({ min: 11, max: 11 })
    .withMessage("Invalid Number"),

  body("data.mobile-number")
    .if(body("method").equals("Easypaisa"))
    .notEmpty()
    .withMessage("Easypaisa number is required")
    .isLength({ min: 11, max: 11 })
    .withMessage("Invalid Number"),
];

export default paymentValidation;
