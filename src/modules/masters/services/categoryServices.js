const db = require('../../../utils/db');

const AddCategory = async (categoryName) => {
    try {
        const [result] = await db.query('CALL CreateCategory(?)', [categoryName]);
        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};

const GetAllCategories = async () => {
    try {
        const [categories] = await db.query('CALL GetAllCategories()');
        return categories[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};

const updateCategory = async (id, category_name) => {
    try {
        console.log('Service received:', id, category_name);

        // Call the stored procedure
        const [result] = await db.query(`CALL UpdateCategory(?, ?)`, [id, category_name]);

        return result;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};


module.exports = { AddCategory, GetAllCategories, updateCategory };
