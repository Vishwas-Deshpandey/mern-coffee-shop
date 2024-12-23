import { verifyJwtToken } from "../helper/authHelper.js";
import User from "../model/userModel.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({
                message: "Authorization Header is Missing"
            })
        }

        let token = authorizationHeader.split(" ")[1];

        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({
                message: "Token Not found"
            })
        }

        const userId = await verifyJwtToken(token);

        req.user = userId;

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}


export const isResturantOwner = async (req, res, next) => {
    try {
        // find the logged in user role

        const user = await User.findById(req.user).select("role");

        if (!user) {
            return res.status(404).json({ message: "No User Found" })
        }

        if (user.role !== 'RESTAURANT_OWNER') {
            return res.status(401).json({ message: "UnAuthorized Access Denied" })
        }

        next();
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user).select("role");

        if(!user){
            return res.status(404).json({
                message:"No User Exist With this credentials"
            })
        }

        if (user.role !== 'ADMIN') {
            return res.status(401).json({
                message: "UnAuthorized Access Denied"
            })
        }

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "server error"
        })
    }
}