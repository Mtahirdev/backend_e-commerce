import app from "./src/app.js";
import config from "./src/config/config.js";
import ConnectDB from "./src/config/Database.js";

ConnectDB();



app.listen(config.PORT,()=>{
    console.log(`server is running no port ${config.PORT}`);
    
})