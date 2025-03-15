const db = require('../../../utils/db');

const createRole = async (role_type) => {
    try {
        const [result] = await db.query("CALL CreateRole(?)", [role_type]);
        return result;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database error: " + error.message);
    }
};


const GetAllRoles = async () => {
    try {
        const [Roles] = await db.query('CALL GetAllRoles()');
        return Roles;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database error: ' + error.message);
    }
};

module.exports = { createRole, GetAllRoles};