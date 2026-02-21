class ApiResponse {
    constructor(
        statusCode, // status code will be for success but less then 400 
        data, // Send Data Cause there is no error so we can send it 
        message = "Success" // Alway's this msg 
    ) {
        this.statusCode = statusCode // 200 201 202 204 ....
        this.data = data // Always 
        this.message = message // Fix 
        this.success = statusCode < 400 /* GREATER THEN 400 = ERROR MESSAGE */

    }
}

/*

The success version of ApiError
Standardizes all success responses across your API

Cleaver line 🔥
------------
statusCode = 200 → 200 < 400 = true  ✅ success
statusCode = 201 → 201 < 400 = true  ✅ success
statusCode = 404 → 404 < 400 = false ❌ not success
statusCode = 500 → 500 < 400 = false ❌ not success


// In any controller : We are Returning an Response 

return res.status(200).json(
    new ApiResponse(200 , userData , "User fetched successfully")
)

// Frontend receives : 

{
    statusCode: 200 ,
    data: { name : "Krishna" , email : "k@gmail.com" } ,
    message: "User fetched successfully" ,
    success: true 
}

*/