const subcategoryServices = require('../services/subCategoryServices');

// add Sub category 
const addSubCategory = async (req, res) => {
    try {
        const { category_id, sub_category_name, description } = req.body;

        // Validate input
        if (!category_id || !sub_category_name) {
            return res.status(400).json({
                success: false,
                message: 'Category ID and Sub Category name are required',
            });
        }

        console.log("Received:", category_id, sub_category_name);

        // Call service to insert subcategory
        const result = await subcategoryServices.AddSubCategory(category_id, sub_category_name, description);

        return res.status(201).json({
            success: true,
            message: 'Sub Category added successfully',
            data: result,
        });

    } catch (error) {
        console.error('Error adding sub category:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

// fetch Sub category list
const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await subcategoryServices.GetAllSubCategories();
        return res.status(200).json({
            success: true,
            message: 'Sub Categories retrieved successfully',
            data: subCategories,
        });
    } catch (error) {
        console.error('Error fetching sub categories:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from request parameters
        const { category_id, sub_category_name, description } = req.body;

        // Validate input
        if (!id || !category_id || !sub_category_name) {
            return res.status(400).json({
                success: false,
                message: 'ID, Category ID, and Sub Category name are required',
            });
        }

        // Call service function
        const result = await subcategoryServices.updateSubCategory(id, category_id, sub_category_name, description);

        return res.status(200).json({
            success: true,
            message: 'Sub Category updated successfully',
            data: result,   
        });

    } catch (error) {
        console.error('Error updating sub category:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

module.exports = {addSubCategory, getAllSubCategories, updateSubCategory}