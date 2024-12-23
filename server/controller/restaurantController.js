import Restaurant from "../model/restaurantModel.js";

// add a new restaurant 
export const addRestaurantController = async (req, res) => {
    try {
        const { name, email, mobile, city, state, zip, address } = req.body;

        // check wheather the restaurant is already exist or not
        const isRestaturantExist = await Restaurant.findOne({ user: req.user });

        if (isRestaturantExist) {
            return res.status(400).json({
                message: "Restaurant Already Exist with this Name"
            })
        }

        const restaurant = await Restaurant.create({
            user: req.user,
            name,
            email,
            mobile,
            city,
            state,
            zip,
            address
        })

        return res.status(201).json({
            message: `Congratulations ${restaurant.name} has Been Registerd Successfully`
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Server Error.."
        })
    }
}


export const getMyRestaurantController = async (req, res) => {
    try {
        const myRestaurant = await Restaurant.findOne({ user: req.user }).populate({ path: "user", select: "name email" });


        if (!myRestaurant) {
            return res.status(404).json({
                message: "No Restaurant Found With This Credentials"
            })
        }


        return res.status(200).json({
            message: "Restaurant Details",
            myRestaurant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}


export const changeRestaurantStatus = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const userId = req.user;


        const restaurant = await Restaurant.findOne({ _id: restaurantId, user: userId }).select('user isOpen');

        if (!restaurant) {
            return res.status(404).json({
                message: "No Restaurent Found."
            })
        }

        if (userId.toString() !== restaurant.user.toString()) {
            return res.status(401).json({ message: "UnAuthorized User" })
        }

        restaurant.isOpen ? restaurant.isOpen = false : restaurant.isOpen = true;

        await restaurant.save();


        return res.status(200).json({
            message: `Restaurent ${restaurant.isOpen ? 'opened' : 'closed'} successfully`,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}