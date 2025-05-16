const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler')
async function authToken(req,res,next){
    try{
        const token = req.cookies?.token

        console.log("token",token)
        if(!token){
            return res.status(200).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            console.log(err)
            console.log("decoded",decoded)
            
            if(err){
                console.log("error auth", err)
            }

            req.userId = decoded?._id

            next()
        });


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}


module.exports = authToken


/*const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');

// @desc    Authenticate admin and protect routes
// @access  Private
const authToken = asyncHandler(async (req, res, next) => {
    let token;

    // Get token from cookies
    token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get admin from token and attach to request
        req.admin = await Admin.findById(decoded.userId).select('-password');
        
        if (!req.admin) {
            res.status(401);
            throw new Error('Not authorized, admin not found');
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        
        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            res.status(401);
            throw new Error('Not authorized, invalid token');
        } else if (error.name === 'TokenExpiredError') {
            res.status(401);
            throw new Error('Not authorized, token expired');
        } else {
            res.status(500);
            throw new Error('Internal server error');
        }
    }
});

// Export as both default and named export
module.exports = authToken;
module.exports.authToken = authToken; // For named imports*/