import app from "./src/app.js";
import ConnectDB from "./src/config/Database.js";

await ConnectDB();

export default app;
