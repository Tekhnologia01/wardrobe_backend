const productService = require("../services/addProductServices");
const upload = require('../../../middlewares/multer'); 

const addProduct = async (req, res) => {
    try {
        const { category_data, note, created_by } = req.body;

        // Extract file paths from req.files
        const photo = req.files?.photo ? req.files.photo[0].path : null;
        const extractedPhotoPath = photo ? photo.split("\\").slice(-2).join("\\") : null;

        // Validate input
        if (!photo || !category_data || !created_by) {
            return res.status(400).json({
                success: false,
                message: "Photo, category data, and created_by are required.",
            });
        }

        // Parse and validate `category_data`
        let parsedCategoryData;
        try {
            parsedCategoryData = JSON.parse(category_data);
            if (!Array.isArray(parsedCategoryData) || parsedCategoryData.length === 0) {
                throw new Error();
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid category_data format. It must be a valid JSON array.",
            });
        }

        console.log("Adding Product:", extractedPhotoPath, parsedCategoryData, note, created_by);

        // Call service function
        const result = await productService.addProduct(extractedPhotoPath, parsedCategoryData, note, created_by);

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: result,
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const Products = await productService.GetAllProducts();
        return res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: Products,
        });
    } catch (error) {
        console.error('Error fetching Products:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const updateFavouriteProductStatus = async (req, res) => {
    const { id } = req.params; // Get the ID from request parameters
    const { faurite_product_status } = req.body;
console.log("Input", id, faurite_product_status);

    // Validate input
    if (!id || !faurite_product_status) {
        return res.status(400).json({
            success: false,
            message: "Product ID and faurite_product_status are required.",
        });
    }
    try {
    
        // Call the service function
      const result =  await productService.updateFavoriteProductStatus(id, faurite_product_status);
console.log('result', result)
        return res.status(200).json({
            success: true,
            message: "Favourite product status updated successfully.",
            data :result,
        });

    } catch (error) {
        console.error("Error updating favourite product status:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


module.exports = { addProduct, getAllProducts, updateFavouriteProductStatus};
