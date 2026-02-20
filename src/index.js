// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js"
import dotenv from "dotenv" // LOAD ENV VARIABLES 
import ConnectDB from "./db/index.js";
import { app } from "./app.js";

// THIS READ'S .ENV FILE AND SERVER OF THE CREDENTIAL'S 
dotenv.config({
    path: "/.env"
}) // LOAD'S .ENV FILE IN PROCESS.ENV 

// CONNECT DB FINAL 
ConnectDB()  // WHEN ASYNC FUNCTION RUN'S IT RETURN'S PROMISES

    //  START THE SERVER 


    // ONLY IF DB CONNECT'S SUCCESSFULLY - START THE HTTP SERVER 
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("Server is RUNNING at PORT : ", process.env.PORT)
        }
        )
    })
    // IF DB FAIL STOP THE HTTP SERVER AND LOG THE ERROR 
    .catch((err) => {
        console.log("MONGO DB CONNECT FAILED !!!", err)
    })












































// METHOD - 1 : DB CONNECTION 

/*
import express from "express"
const app = express()

    ; (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on('ERROR', (error) => {
                console.log("ERROR : ", error);
                throw err
            })

            app.listen(process.env.PORT, () => {
                console.log("APPLICATION IS LISTENING ON PORT  : ", process.env.PORT)
            })

        } catch (err) {
            console.error("ERROR : ", err);
            throw err

        }
    })()
*/