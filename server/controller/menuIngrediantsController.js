import MenuIngrediant from "../model/menuIngrediantsModel.js";
import Restaurant from "../model/restaurantModel.js";

export const createMenuIngrediantController = async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const { restaurantId } = req.params;

        if (!name || !price || !stock) {
            return res.status(400).json({
                message: "All Fields Are Required to Proceed"
            })
        }

        const restaurant = await Restaurant.findOne({ _id: restaurantId, user: req.user });

        if (!restaurant) {
            return res.status(401).json({
                message: "No Restaurant Availble with this id"
            })
        }

        const isMenuIngrediantExist = await MenuIngrediant.findOne({ name, restaurantId });

        if (isMenuIngrediantExist) {
            return res.status(200).json({
                message: "This Ingrediant Already Exist in the restaurant"
            })
        }

        const menuIngrediant = await MenuIngrediant.create({
            name,
            price,
            stock,
            restaurantId
        })

        return res.status(201).json({
            message: "New Menu Ingrediant is added Successfully",
            menuIngrediant
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getAllMenuIngrediants = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const menuIngrediants = await MenuIngrediant.find({ restaurantId });

        if (!menuIngrediants) {
            return res.status(200).json({
                message: "No MenuIngrediants available"
            })
        }

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                message: "No Restaurant Found."
            })
        }

        // check whether the loggedin user is only the restaurant owner or not
        if (req.user.toString() !== restaurant.user.toString()) {
            return res.status(401).json({
                message: "UnAuthorized Can't See Another Restaurant Details"
            })
        }

        return res.status(200).json({
            message: "Ingrediants Fetched SuccessFully",
            menuIngrediants
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const getSingleMenuIngrediant = async (req, res) => {
    try {
        const { id } = req.params;

        const menuIngrediant = await MenuIngrediant.findById(id).populate('restaurantId', 'user');

        if (!menuIngrediant) {
            return res.status(200).json({
                message: "No Ingrediant Available"
            })
        }

        if (req.user.toString() !== menuIngrediant.restaurantId.user.toString()) {
            return res.status(401).json({
                message: "Unauthorized You Can't See Other Restaurant Details"
            })
        }

        return res.status(200).json({
            message: "Single Menu Ingrediant Fetched Successfully",
            menuIngrediant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export const updateMenuIngrediant = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const { id } = req.params;

        const isRestaurantExist = await Restaurant.findOne({ user: req.user });

        if (!isRestaurantExist) {
            return res.status(401).json({ message: "Unauthorized You Can't Update the details of this restaurant" })
        }

        const menuIngrediant = await MenuIngrediant.findById(id).populate('restaurantId','user');

        if (!menuIngrediant) {
            return res.status(404).json({
                message: "No Ingrediant Found Create a new one"
            })
        }

        if(menuIngrediant.restaurantId.user.toString() !== req.user.toString()){
            return res.status(401).json({ message: "Unauthorized You Can't Update " })
        }

        if (name) {
            menuIngrediant.name = name
        }

        if (price) {
            menuIngrediant.price = price
        }

        if (stock) {
            menuIngrediant.stock = stock
        }

        await menuIngrediant.save();

        return res.status(200).json({
            message: "Menu Ingrediant Update Successfully",
            menuIngrediant
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}
