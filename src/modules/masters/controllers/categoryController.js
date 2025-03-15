const categoryService = require('../services/categoryServices');

// add category 
const addCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        // Validate input
        if (!category_name || category_name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Category name is required',
            });
        }

        // Call service to insert category
        const result = await categoryService.AddCategory(category_name.trim());

        return res.status(201).json({
            success: true,
            message: 'Category added successfully',
            data: result,
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// fetch category list
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.GetAllCategories();
        return res.status(200).json({
            success: true,
            message: 'Categories retrieved successfully',
            data: categories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from URL parameters
        const { category_name } = req.body; // Extract category_name from request body

        // Validate inputs
        if (!id || !category_name || category_name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Category ID and name are required.",
            });
        }

        // Call service function
        const result = await categoryService.updateCategory(id, category_name.trim());
        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = { addCategory, getAllCategories, updateCategory};
