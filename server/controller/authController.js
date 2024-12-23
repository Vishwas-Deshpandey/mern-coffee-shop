import { comparePassword, generateJwtToken, hashPassword } from "../helper/authHelper.js";
import User from "../model/userModel.js";

// register user
export const registerUserController = async (req, res) => {
    try {
        // get the registration details from the req.body;
        const { name, email, password, mobile, role } = req.body;

        // check wheather the user is already registered or not
        const isUserExist = await User.findOne({ email }).select("-password");

        if (isUserExist) {
            return res.status(400).json({
                message: "User Already Exist With this email"
            })
        }

        // hash the user password
        const hashedPassword = await hashPassword(password);

        // register the user

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            mobile,
            role
        })

        // genrate the jwt token for the user

        const token = generateJwtToken(user._id);

        // send the response with status of 201 for new user registration successfully

        return res.status(201).json({
            message: "Registerd Successfully",
            user: { userId: user._id, name, role },
            token
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check wheather the user is already registerd or not
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const isPasswordMatched = await comparePassword(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        // genrate the jwt token and send
        const token = generateJwtToken(user._id);

        return res.status(200).json({
            message: "LoggedIn Successfully",
            user: { userId: user._id, name: user.name, role: user.role },
            token
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getMyUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password -role');

        if(!user){
            return res.status(404).json({
                message:"User Not Exist With This Credentials"
            })
        }

        return res.status(200).json({
            message: `Hi ${user.name}`,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}