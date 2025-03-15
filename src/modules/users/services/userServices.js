const db = require('../../../utils/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (
    role_id, 
    uu_id, 
    firstName, 
    lastName, 
    email, 
    contact,
    address, 
    userName, 
    password, 
    photo, 
    created_by
) => {
    try {
          // Hash the password before storing it
          const hashedPassword = bcrypt.hashSync(password, 8);
        const [result] = await db.query("CALL CreateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                role_id, 
                uu_id, 
                firstName, 
                lastName, 
                email, 
                contact, 
                address, 
                userName, 
                hashedPassword,  // Use the hashed password here 
            //    password,
                photo, 
                created_by
            ]);
        return result;
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database error: " + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const [result] = await db.query("CALL GetAllUsers()");
        return result[0]; // Returning only the fetched data
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Database error: " + error.message);
    }
};

// login User API 
const loginUser = async (uu_id, password) => {
    try {
        const [result] = await db.query("CALL LoginUser(?)", [uu_id]);

        if (!result[0].length) {
            throw new Error("User Not Found");
        }

        const user = result[0][0];

        // Compare stored hashed password with provided password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Password");
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user.user_id, role_id: user.role_id, uu_id: user.uu_id },
            'wardrobe@99',
            { expiresIn: '10h' } // Set expiry time
        );

        return { token, roleId: user.role_id };
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error.message);
    }
};

module.exports = { createUser, getAllUsers, loginUser };
