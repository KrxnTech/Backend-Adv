import mongoose, { Schema } from "mongoose";

/* Working on PassWord Encryption : Using MongoDB Hooks ex - PRE */
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { useCallback } from "react";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, // Remove Spacing 
        index: true, // Make Search Fast 

        /*
        Why index: true ? ---> Create's a database index on this file 
        Think of it's like a book index page 
        instead of reading every page to find a word you Jump directly to the right page 
        Makes Searching by username very fast 
        */
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, // 3RD PARTY : URL
        required: true,
    },
    converImage: {
        type: String, // // 3RD PARTY : URL
    },

    /* REMEMBER THIS REFRENCE SYNTAC */
    WatchHistory: [

        // An Array of Video ID's store all video's a user has watched 
        // User see any video we will push it's ID in thie Array to track is easily .... 
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "PassWord is Required Can't Leave it Empty !!!"],
    },
    refreshToken: {
        type: String,
    }

}, { timestamps: true })

/* Working on Hooks : PRE - Middle Ware using Next */



// What is Pre ? : A function that run's automatically before / after a database operation
// Run Before Saving to DataBase Every tie : "Save"
// 
UserSchema.pre("save", async function (next) {
    /* next : Pass Further this flag  */

    // Smart Check : Imagine user update's their profile pic / Without this check 
    // the password would get re - hashed unnecessarliy every time any field changes 

    if (!this.isModified("password")) { // Return True only if Password is Change 
        return next() // Skip Don't Hash Again 
    }

    // Replce plan password with hash version before saving 
    this.password = await bcrypt.hash(this.password, 10) /* 10 is Round */
    next()
})

/* Problem :  On Model Schema Change it will run again and again */

UserSchema.methods.isPassWordCorrect = async function (password) {
    /*  Chechking PassWord : Before Saving */
    return await bcrypt.compare(password, this.password) /* Crypto Graphy : Computatin power takes time */

    /* Comparing both the Password : String Vs Encrypted */


    /* You can't reverse a hask back to original . So Bcrypt hashes the incoming password and compares the tow hashes  */
}

/* JWT TOKEN */
UserSchema.methods.generateAccessToken = function () {
    // It can Gen Token : Create's a Token 
    return jwt.sign({
        _id: this._id,  // From MongoDB 

        // From Our Side : Payload in JWT 
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },

        process.env.ACCESS_TOKEN_SECRET,
        // Expiry in Object /; How Long Token is Valid 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

/* JWT TOKEN */
UserSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        _id: this._id
        /* Why Only _id ? in refresh token : 
           Refresh token's only Job is to Identify the user to issue a new access token . It Does't 
           need all the extra info 
        */
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

/* Hasing During Sign Up and Comparing During Log in up */

export const User = mongoose.model("User", UserSchema)

/*

Bcrypt kind of Authentication Zone 

Sign Up: Create a new Acc || You use this when a user is new and wants to register || I dont exist i want to create 
What is takes -> Name + Email + Password 


Log In: Enter an Existing Account || User already has an account.Now they are proving who thet are || I already Exist let me in
You Enter email + password
Backend Check :
    Does User Exist ?
    Does Hashed Password Match ?
    If correct - Gen JWT / Session 
    Send token or Cookie 
What is takes -> Email + Password


Sign In: This is Basically the same as Log In 
Google say: Sign In
Many Diff Company say: Log In 


Log Out: End the Session 
User is currently authenticated and want's to exit 
Backend work depend's on auth method 
Kick me out(Session end)

Want to Know about : Token || JWT || Cookies || Session || Bcrypt || Flow 

Big Picture : How do I remember this user in future Req ? 
That's where this upper sitting mf's comes on the stage 



*/


/*
    What is Bcrypt ? 
    ---------------
- A Password Hashing Library 
- You never store plan password in DB : if you do that you are nothing but Just peace of shit ( Lawda Dev )
- What is Does 
    instead of storing : password = "krishna123" : Nonsense 
    make it like this : password = "gHsjkKjdhskjdh"

    What is Hasing ? 
- One Way Transformation 
- Cannot Reverse back to original password 

   // HOW IT WORKS // 
   Frontend Side : JSON Sign Up Flow 
   {
        "email": "user@gmail.com",
        "password": "123456"
    }
    Backend : bcrypt.hash(password)
    Store hashed password in DB 

    DataBase working 
    ----------------
    CODE : 
    {
        email: "user@gmail.com",
        password: "$2b$10$..."
    }

    During Login 
        - User send password 
        - Backend uses bcrypt.compare()
        - if Matches : Success 


    */
/*
    What is Session ? 
    ----------------
    It is Basically used for the check that user is authenticated or not 
    It is a old school method 
    
    How it Work's 
    -------------
    When user log's in
    Backend creates a session object in server database 
    Server gen a random session Id 
    Send that Id to browser ( inside cookies it send )

*/


/*

    What is Cookie ? 
    - It is used to indentify user 
    - We go to any website and fill out email and password ( Remember me buttont : click )
      Browser store's our info but that ok button req goes to server and it gen a SessionID and that will store in cookie 

    // Cookie Store what extra // 
    - Visited pages ( last previus )
    - Product clicking 
    - Depend's on website action .... 


    Cookie store SessionId 
    it can be anymore ... 

    Cookie store's in our browser Always 
    Size : 4KB 
    Stored in : Browser 
    Stores : JWT Token and SessionID 

    If we come's in again : Server identify with our old sessionId and we get the web site access 
    

*/


/*
    What is JWT ? 
    ------------
 The Full Form of JWT is Json Web Token .... 
 🎫 JWT (Modern Way)
------------------------
User logs in
    └──> Server creates JWT (signed token with user info)
            └──> Sends to browser (stored in cookie or memory)
                    └──> Next request sends JWT in header/cookie
                            └──> Server VERIFIES signature (no DB needed!)
                                    └──> Extracts user info from token ✅



*/


/*
🗂️ Session( Old School )
----------------------
User logs in
    └──> Server creates session in its own database
            └──> Generates random session ID: "sess_abc123"
                    └──> Sends session ID to browser in cookie
                            └──> Browser stores it
                                    └──> Next request sends session ID
                                            └──> Server looks up session in DB
                                                    └──> Finds user ✅
*/