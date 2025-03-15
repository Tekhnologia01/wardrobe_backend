const db = require('../../../utils/db');


const addProduct = async (photo, categoryData, note, created_by) => {
    let connection;
    try {
        connection = await db.getConnection(); // Get a new DB connection
        await connection.beginTransaction(); // Start transaction

        // Step 1: Declare a session variable for the OUT parameter
        await connection.query('SET @add_product_id = 0');

        // Step 2: Call the stored procedure with the OUT parameter
        await connection.query('CALL CreateProduct(?, ?, ?, @add_product_id)', [photo, note, created_by]);

        // Step 3: Retrieve the generated `add_product_id`
        const [[{ add_product_id }]] = await connection.query('SELECT @add_product_id AS add_product_id');

        if (!add_product_id) {
            throw new Error('Failed to insert product.');
        }

        // Step 4: Insert categories and subcategories
        for (const category of categoryData) {
            const category_id = category.category_id;
            const sub_categories = category.sub_categories;

            // Set session variable for category OUT parameter
            await connection.query('SET @product_category_details_id = 0');

            // Insert category into `tbl_product_category_details`
            await connection.query(
                'CALL CreateProductCategoryDetails(?, ?, @product_category_details_id)', 
                [add_product_id, category_id]
            );

            // Retrieve the generated `product_category_details_id`
            const [[{ product_category_details_id }]] = await connection.query('SELECT @product_category_details_id AS product_category_details_id');

            if (!product_category_details_id) {
                throw new Error('Failed to insert product category.');
            }

            // Insert subcategories into `tbl_product_sub_category`
            for (const sub_category_id of sub_categories) {
                await connection.query(
                    'CALL CreateProductSubCategoryDetails(?, ?, ?)', 
                    [product_category_details_id, add_product_id, sub_category_id]
                );
            }
        }

        await connection.commit(); // Commit transaction
        return { message: 'Product added successfully', add_product_id };
    } catch (error) {
        if (connection) await connection.rollback(); // Rollback transaction on error
        console.error('Error adding product:', error);
        throw error;
    } finally {
        if (connection) connection.release(); // Release connection
    }
};

const GetAllProducts = async () => {
    try {
        const [Products] = await db.query('CALL GetAllProducts()');
        return Products;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};

// update Faurite
const updateFavoriteProductStatus = async (id, faurite_product_status) => {
    try {
        const [result] = await db.query(
            "CALL UpdateFauriteProductStatus(?, ?)",
            [id, faurite_product_status]
        );

        return result;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database error: " + error.message);
    }
};
module.exports = {addProduct, GetAllProducts, updateFavoriteProductStatus}