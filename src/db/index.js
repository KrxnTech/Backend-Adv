// METHOD - 2 : DB CONNECTION 

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const ConnectDB = async () => {
    try {
        // WHY ASYNC : NETWORK CAN FALL THAT'S WHY 
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MONGO DB CONNECTED !! DB HOST : ${ConnectionInstance.connection.host}`)

    } catch (err) {
        console.error(`MONGO DB Connection Error-- > ${err} `)
        // BACKEND STOP'S 
        process.exit(1)    // 🤔 : IF DB FAIL IT STOP'S THE APPLICATION ( 1 = ERROR 0 = SUCCESS )
    }
}

export default ConnectDB