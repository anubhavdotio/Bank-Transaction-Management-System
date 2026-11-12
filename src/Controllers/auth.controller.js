const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const emailService = require("../services/email.service")
const tokenBlackListModel = require("../models/blacklist.model")
const accountModel=require("../models/account.model")

/**
* - user register controller
* - POST /api/auth/register
*/
async function userRegisterController(req, res) {
    const { email, password, name } = req.body

    const normalizedEmail=email.trim().toLowerCase()
    const isExists = await userModel.findOne({
        email: normalizedEmail
    })

    if (isExists) {
        return res.status(422).json({
            message: "User already exists with email.",
            status: "failed"
        })
    }
 const hash=await bcrypt.hash(password,10)
    const user = await userModel.create({
        email:normalizedEmail,
        password:hash,
        name
    })
    const account=await accountModel.create({
        user:user._id,
        status:"ACTIVE",
        currency:"INR"

    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token)

    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    await emailService.sendRegistrationEmail(user.email, user.name)
}

/**
 * - User Login Controller
 * - POST /api/auth/login
  */

async function userLoginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email.trim().toLowerCase()
    }).select("+password");

    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        });
    }

    const isValidPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    });
}

/**
 * - User Logout Controller
 * - POST /api/auth/logout
  */
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}


module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController
}