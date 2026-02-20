/*
EXPRESS APP SETUP : IT JUST CONFIGURE NOT START THE SERVER 

ADDING MIDDLEWARE ✅
CORS CONFIG ✅
JSON PARSING ✅

App.Listen : This will be in Index.js ✔️
*/

import express from "express"
import cors from "cors" // 🤔 - HELP'S BACKEND AND FRONTEND TO TALK WITH EACH OTHER ( LOCAL HOST CONCEPT'S )
import cookieParser from "cookie-parser" // 🤔
const app = express()

// MIDDLE WARE'S 
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true })) // MIDDLE-WARE : credentials : true = Allows cookie's and auth headers to be sent cross origin 
app.use(express.json({ limit: "20kb" })) // LIMIT LAGA DE 20KB SE JYADA NAII LENA - VARNA SERVER SLOW AND CRASH && Tells Express to read and parse JSON data from incoming requests
app.use(express.urlencoded({ extended: true, limit: "20kb" })) // HTML FORM DATA HANLDING : JSON FORMATION WORK ( ACT AS A MIDDLE WARE AND SEND IT IN REQ.BODY )
app.use(express.static("public")) // SERVER FILE'S FROM PUBLIC 
app.use(cookieParser()) // SETTING MIDDLE WARE'S : Activates the cookie-parser

// EXPORT IT .....
export { app } // SO WE CAN USE IT IN ANOTHER FILE LIKE src / index.js 

/*
BY DEFAULT EXPRESS CAN'T READ THE COOKIES FROM INCOMING REQUESTS... ( CLIENT SIDE )
THIS MIDDLEWARE PARSES THE COOKIE HEADER AND PUTS THE VALUE IN REQ.COOKIES SO YOU CAN ACCESS THEM EASILY 
-> Cookie Parse 🤔
- Reads that raw cookies Headers
- Convert it into a JS Object 
- Stores it inside req.cookies

    Before Cookie-Parse  : Just a Messy String 
    -------------------
    req.headers.cookie = "token=abc123; user=krishna"

    After Cookie-Parse   : Clean Object 
    -------------------
    req.cookies = {
        token: "abc123",
        user: "krishna"
    }
*/
