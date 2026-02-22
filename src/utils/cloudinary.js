/*
    What is Multer ? 

    - Multer is Express Middle Ware 
    - Either saves it temporarily to disk or holds it in memory

    User selects file on Frontend
        ↓
    Frontend sends POST request with FormData (multipart/form-data)
        ↓
    Request hits your Express route
        ↓
    Multer middleware intercepts the request
    Multer reads the file → stores it temporarily (disk or memory)
        ↓
    Your route handler runs
    You take the file from req.file
        ↓
    You upload that file to Cloudinary using their SDK
    Cloudinary returns a secure_url + public_id
        ↓
    You save that URL into your Database (MongoDB etc....)
        ↓
    Return response to frontend with the file URL


*/


import { v2 as cloudinary } from "cloudinary"
import fs from "fs"    // 🤔 : File System Hmmm ..... = File Operation 
import { useLayoutEffect } from "react";

// Learn about File System + Link & UnLink : Delete Bolte 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null // Dont know what to do next ? 

        // Upload the file on Cloudinary ....
        const Response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"  // Detect by you'r Self 
        })

        // File Uploaded Successfully 
        console.log("Uploaded Successfully on Cloudinary", Response.url)
        return Response // Send to User so It can use it for him self as per his work

    } catch (error) {
        /*
        If file is not Uploaded Successfully ? 
        If it is not uploaded on Cloud so it is currently in our server 
        So it is a good manner that you should delete those unshared file for your server health !!! 
        */

        fs.unlinkSync(localFilePath) // Remove the locally Saved Temp File as the upload operation got failed !!! 
        return null

    }
}


export { uploadOnCloudinary }