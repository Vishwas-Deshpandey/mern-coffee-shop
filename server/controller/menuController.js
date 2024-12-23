import { changeToArray } from "../helper/helper.js";
import Category from "../model/categoryModel.js";
import MenuIngrediant from "../model/menuIngrediantsModel.js";
import Menu from "../model/menuModel.js";
import Restaurant from "../model/restaurantModel.js";

export const createNewMenuController = async (req, res) => {
    try {
        const {
            name,
            price,
            description,
            categoryId,
            menuIngrediants
        } = req.body;


        // step:1 Check All the fields Contains Data or not
        if (!name || !price || !description || !categoryId) {
            return res.status(400).json({
                message: "Please Add All The Fields"
            })
        }

        // step:2 If No File Is available in req.file return response
        if (!req.file) {
            return res.status(400).json({
                message: "Please Provide Menu Image To Create a new Menu"
            })
        }

        // step:3 Find the restaurant with the loggedin user credentials
        const restaurant = await Restaurant.findOne({ user: req.user });

        // step:4 If No Restaurant Found with this credentials send the Unauthorized response
        if (!restaurant) {
            return res.status(401).json({
                message: "Unauthorized Can't create menu "
            })
        }

        // step:5 Check Wheather the loggedin user is the owner of the restaurant which he trying to create menu..
        if (restaurant.user.toString() !== req.user.toString()) {
            return res.status(401).json({
                message: "UnAuthorized You Can't Create Menu"
            })
        }

        // step:6 If Menu in the perticular restaurant availble send him the info about already exist menu
        const isMenuAlreadyExist = await Menu.findOne({ name: name, restaurant: restaurant._id });
        if (isMenuAlreadyExist) {
            return res.status(200).json({
                message: "This Menu Is Already Exist Please Create With Diffrent Menu Name"
            })
        }

        // step:7 Find the category by the category name
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                message: "Can't Create the Menu Item since the category not found"
            })
        }

        // step:8 Check wheather the user passed the menu ingrediants..
        if (!menuIngrediants || (Array.isArray(menuIngrediants) && menuIngrediants.length < 0)) {
            return res.status(400).json({
                message: "Please Add At Least One Ingrediant"
            })
        }

        // step:9 convert the menu ingrediants into an array if they are not
        let listOfMenuIngrediants = Array.isArray(menuIngrediants) ? menuIngrediants : changeToArray(menuIngrediants);


        // step:10 find all the menuIndrediants id's
        const currentRestaurantMenuIngrediants = await MenuIngrediant.find({ restaurantId: restaurant._id })

        if (!currentRestaurantMenuIngrediants) {
            return res.status(404).json("No Menu Ingrediants found..")
        }


        // step: 11 Find All the MenuIngrediants from the restaurants which matches to the menuIngrediants which are got through req.body.menuIngrediants and add all inside a temporary array type of variable.
        let menuIngrediantsId = []
        listOfMenuIngrediants.forEach((name) => {
            let currentIngrediant = currentRestaurantMenuIngrediants.find((ingrediant) => ingrediant.name === name);
            menuIngrediantsId.push(currentIngrediant._id)
        })


        // buisness logic for creating a new menu and save in the database starts here..
        const newMenu = await Menu.create({
            name,
            price,
            description,
            menuImage: `uploads/${req.file.filename}`,
            category: category._id,
            menuIngrediants: menuIngrediantsId,
            restaurant: restaurant._id
        })


        // once menu is created send the Create Response of the menu.
        return res.status(201).json({
            message: "New Menu Is Created Successfully",
            menu: newMenu
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}
