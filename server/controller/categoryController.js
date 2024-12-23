import Category from "../model/categoryModel.js";
import Restaurant from "../model/restaurantModel.js";

export const createNewCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        const restaurant = await Restaurant.findOne({user:req.user});

        
        if (!restaurant) {
            return res.status(404).json({
                message: "No Restaurant Found With This Id"
            })
        }

        if (!name) {
            return res.status(400).json({
                message: "Category Name is Required to Create Category"
            })
        }


        if (req.user.toString() !== restaurant.user.toString()) {
            return res.status(401).json({
                message: "UnAuthorized You Can't Create Category"
            })
        }

        const isCategoryAlreadyExist = await Category.findOne({ name: name, restaurantId: restaurant._id })

        if (isCategoryAlreadyExist) {
            return res.status(200).json({
                message: "This Categorie Already Exist in your Restaurant"
            })
        }

        // create a new category for this restaurant

        const createdCategory = await Category.create({
            name,
            restaurantId:restaurant._id,
        })

        return res.status(201).json({
            message: `${createdCategory.name} for restaurant ${restaurant.name} has been Created Succesfully`,
            category: createdCategory
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}


export const getAllCategoryController = async (req, res) => {
    try {

        const { restaurantId } = req.params;

        const categories = await Category.find({ restaurantId });
        const restaurant = await Restaurant.findById(restaurantId).select('user');

        if (!categories) {
            return res.status(200).json({
                message: "No Categories Found."
            })
        }

        if (!restaurant) {
            return res.status(404).json({
                message: "No Restaurant Found."
            })
        }

        if (req.user.toString() !== restaurant.user.toString()) {
            return res.status(401).json({
                message: "Unauthorized Can't Access another restaurant details"
            })
        }



        return res.status(200).json({
            message: "Categories Fetched Successfully..",
            categories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}


export const getCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId).populate('restaurantId', 'user');

        if (!category) {
            return res.status(404).json({
                message: "No Category Found With this id"
            })
        }

        if (req.user.toString() !== category.restaurantId.user.toString()) {
            return res.status(401).json({
                message: "Unauthorized You Can't see other restaurant Category"
            })
        }


        return res.status(200).json({
            message: "Category Fetched Successfully",
            category
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const restaurant = await Restaurant.findOne({user:req.user});

        if (!restaurant) {
            return res.status(404).json({
                message: "No Restaurant Available with this id"
            })
        }

        if (req.user.toString() !== restaurant.user.toString()) {
            return res.status(401).json({
                message: "Unauthorized Can't access another restaurant Category"
            })
        }

        if (name) {
            const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
                name
            }, { new: true })

            return res.status(200).json({
                message: "Category Updated Successfully",
                category: updatedCategory
            })
        } else {
            return res.status(200).json({
                message: "Can't Update the Category"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}


// export const deleteCategoryController = async (req, res) => {
//     try {
//         const { categoryId } = req.params;

//         const restaurant = await Restaurant.findOne({ user: req.user });

//         if (!restaurant) {
//             return res.status(404).json({
//                 message: "No Restaurant Found With this id"
//             })
//         }

//         if (req.user.toString() !== restaurant.user.toString()) {
//             return res.status(401).json({
//                 message: "Unauthorized Can't delete another restaurant category"
//             })
//         }

//         if (categoryId) {
//             await Category.findByIdAndDelete(categoryId);
//             // handle menu category id update logic remains
//             return res.status(200).json({
//                 message: "This Category Successfully Deleted"
//             })
//         } else {
//             return res.status(200).json({
//                 message: "can't delete this category"
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Server Error'
//         })
//     }
// }