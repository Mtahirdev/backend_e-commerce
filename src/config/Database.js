import mongoose from "mongoose";
import config from "./config.js";



async function ConnectDB(params) {
    try {
        mongoose.connect(config.MONGODB_URI);
        console.log("connect to database");
    } catch (error) {
        console.log("not connect to database");
        
    }
    
};

ConnectDB();


export default ConnectDB;