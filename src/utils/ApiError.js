class ApiError extends Error { // Creates a new class named ApiError && Inherits from JavaScript's built-in Error class
    constructor(
        statusCode,     // HTTP error code
        message = "Some went wrong",    // Human readable error
        errors = [],   // ERROR OF DETAILED ERROR : ex - ["email is required"]
        stack = ""     // WHERE DID ERROR OCCURED : Where Error happend in code - auto-generated
    ) {
        super(message) // FOLLOWING RULE BEFORE USING this WE CALL super 

        // Setting Properties
        this.statusCode = statusCode
        this.data = null  // No data on errors : If there is an Error so there will no data to return 
        this.message = message // Show Error Message 
        this.success = false // Alway's false for Error : This is an error class — it will never be a success
        this.errors = errors // Detailed Error List 
    }
}

/*

A CUSTOM ERROR CLASS THAT CREATE'S STRUCTURED CONSISTENT ERROR RESPONSE ACROSS YOUR ENTIRE API 
always clean & consistent 

*/


/*

// How it is Used ? 🤔

// In any controller :

if (!user) {

    throw new ApiError(404 , "User not found")
}

// Response sent to frontend :

{
    statusCode: 404,
        message: "User not found",
            success: false,
                data: null,
                    errors: []
}

*/