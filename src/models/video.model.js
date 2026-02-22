import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // It is a plugin for pagination ? 

const videoSchema = new Schema({
    videoFile: {
        type: String, // Cluadenaryy
        required: true,
    },
    thumbnail: {
        type: String, // Cluadenaryy
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String, // Cluadenaryy ( Second ) 
        required: true,
    },
    duration: {
        type: Number, // 3rd PARTY URL + ({DURATION TIME}) ( ClaudeNary)
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true, // Video is Published : why true for publicity like it is not hidden and any one can see it 
    },
    owner: {
        type: Schema.Types.ObjectId, // Take's the ID 
        ref: "User" // Video belong's to which user ? find by ID 
    }


}, { timestamps: true }) // for created ( uploaded ) and updated ( Edited ) situation 

videoSchema.plugin(mongooseAggregatePaginate) // Aggragetion Pipe-Line Working ... 

export const Video = mongoose.model("Video", videoSchema) // Model creation sytanx 

/*
    Ok ! let's learn about Pagination in Mongo DB
    ---------------------------------------------
    
    Today Human store to much data like tommorow the world is going to end 😄
    What problem it cause ? 
    ----------------------
    - Server load increase 
    - Frontend Slow 
    - Database Error 
    etcc .....

    What is Pagination ? 
    - Sending data after breaking it into smaller smaller part's instead of sending it in bunch 

    For Example : 
    
    DB Contain's 100000 User and if we run GET then boom 
    - Frontend Gone Freeze ( Nothing but peace of shit now )
    - Server Crash ( Amma Behen ek )
    - DB ka Bhang Bhosda 

    So Pagination solve this problem
    by using some method's like   //  skip() / limt()  //  

    instead of getting 10K user at one's what will do using pag we will tell our backend 
    Hey first Just send me 10 user data until user click the next button then only you have to send other wise not 

    // Benefit's of using Pagination // 
    -----------------------------------

    Performance me Jaan ✨
    Frontend Super Dupper ✨
    Memory usage very low ✨
    Better user experience ✨


    Final : Divide large data in managable chunk's then fetch from DB and send in frontend 


*/