import { body } from "express-validator";

const Edit_profile_validation = [
  body("username").trim().notEmpty().withMessage("Username is required").bail(),

  body("email").trim().isEmail().withMessage("Enter a valid email").bail(),

  body("dateofbirth")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Enter a valid date of birth")
    .bail(),

  body("number")
    .optional({ values: "falsy" })
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 characters")
    .bail(),

  body("gender")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Gender must be a valid value")
    .bail(),

  body("country")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Country must be a valid value")
    .bail(),

  body("state")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("State must be a valid value")
    .bail(),

  body("city")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("City must be a valid value")
    .bail(),
];

export default Edit_profile_validation;
