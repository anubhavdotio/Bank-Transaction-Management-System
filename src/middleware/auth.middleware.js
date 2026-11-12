// yeah middleware ham loggedin user ko verified check krne k liye used krenge
// ki jo request aa rhi h wah valid logged in user se aa rhi h 


const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
 const tokenBlacklistModel=require("../models/blacklist.model") 


async function authMiddleware(req,res,next){
      
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1]


    if(!token){
        return res.status(401).json({
            message:"Unauthorized access,token is missing"
        })
    }

    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

if (!decoded.userId) {
    return res.status(401).json({
        success: false,
        message: "Invalid token payload"
    });
}

const user = await userModel.findById(decoded.userId);

if (!user) {
    return res.status(401).json({
        success: false,
        message: "User not found. Please login again."
    });
}

req.user = user;
next();

    }catch(err){
        return res.status(401).json({
            message:"Unauthorised access,token is invalid"
        })
    }


}

async function authSystemUserMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing"
        })
    }

    const isBlacklisted = await tokenBlacklistModel.findOne({ token })

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId).select("+systemUser")
        if (!user.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user"
            })
        }

        req.user = user

        return next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

}

module.exports={
    authMiddleware,authSystemUserMiddleware
}