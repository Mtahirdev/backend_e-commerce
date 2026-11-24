import express from "express";
import SignupValidation from "../validator/signup.validator.js";
import {
  LoginFun,
  OtpFun,
  RequesOtp,
  SignupFun,
  RefreshToken,
  Getme,
  SetType,
  Logout,
} from "../controller/auth.controller.js";
import LoginValidator from "../validator/login.validator.js";

let AuthRouter = express.Router();

AuthRouter.post("/auth/signup", express.json(), SignupValidation, SignupFun);
AuthRouter.post("/auth/verify-otp", express.json(), OtpFun);
AuthRouter.get("/auth/request-otp", express.json(), RequesOtp);
AuthRouter.post("/auth/login", express.json(), LoginValidator, LoginFun);
AuthRouter.post("/auth/type", express.json(), SetType);

AuthRouter.get("/auth/refresh-token", RefreshToken);

AuthRouter.get("/auth/getme", Getme);

AuthRouter.get("/auth/logout", Logout);
export default AuthRouter;

// const API_KEY = "6303a625a9d631bbdf6068b4d2505f42";

// async function getWeather() {
//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=${API_KEY}&units=metric`,
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }

//     const data = await response.json();

//     console.log("City:", data.name);
//     console.log("Temperature:", data.main.temp, "°C");
//     console.log("Weather:", data.weather[0].description);
//     console.log("Humidity:", data.main.humidity, "%");
//     console.log("Wind Speed:", data.wind.speed, "m/s");
//   } catch (error) {
//     console.error("Failed to fetch weather:", error.message);
//   }
// }

// getWeather();
