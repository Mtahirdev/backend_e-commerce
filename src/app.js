import express from "express";
import cors from "cors";
import AuthRouter from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import AdminRouter from "./router/admin.routes.js";
import BuyerRouter from "./router/buyer.routes.js";

let app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use(AuthRouter);
app.use(AdminRouter);
app.use(BuyerRouter);

export default app;
