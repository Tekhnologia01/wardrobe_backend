const db = require('../../../utils/db');

const AddSubCategory = async (category_id, sub_category_name, description) => {
    try {
        const [result] = await db.query('CALL CreateSubCategory(?, ?, ?)', [category_id, sub_category_name, description]);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};

const GetAllSubCategories = async () => {
    try {
        const [subCategories] = await db.query('CALL GetAllSubCategory()');
        return subCategories;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};

// update sub category
const updateSubCategory = async (id, category_id, sub_category_name, description) => {
    try {
        // Call the stored procedure
        const [result] = await db.query(`CALL UpdateSubCategory(?, ?, ? ,?)`, [
            id, 
            category_id, 
            sub_category_name, 
            description
        ]);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};


module.exports={AddSubCategory, GetAllSubCategories, updateSubCategory}