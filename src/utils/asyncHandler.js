/*

A wrapper function that handles errors in async route handlers automatically 
— so you dont have to write try / catch in every single controller
Without asyncHandler — repetitive & messy

Every controller needs try / catch
---------------------------------------
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        next(err)  // repeat this in EVERY controller!
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        next(err)  // again...
    }
}

With asyncHandler function 
--------------------------------------------
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)   // No try/catch needed!
})

*/


/* 

Wrapper function : AsyncHandler is a high order function - a function that takes another function as argument and returns a new function
asyncHandler(yourControllerFn like getUser / getPost) → returns a new safe version of it: )

*/

const asyncHandler = (reqHandler) => { // reqHandler : Your actual controller function
    (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err))
        /*
        Wraps the function in a Promise
        Calls your controller with Express params
        If anything fails passes error to Express error handler
        */
    }
}

export { asyncHandler }

/* : HOW IT LOOK'S LIKE ?

const asyncHandler = () => { }
const asyncHandler = (fn) => { () => { } }
const asyncHandler = (fn) => async () => { }

*/



/* : HIGHER ORDER FUNCTION 

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (err) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}

*/