const userService = require("../services/userServices");

const createUser = async (req, res) => {
    try {
        const { 
            role_id, uu_id, firstName, lastName, email, contact, 
            address, userName, password, photo, created_by 
        } = req.body;

        // Validate Input
        if (!role_id || !uu_id ) {
            return res.status(400).json({
                success: false,
                message: "role id and uu id fields are required."
            });
        }
        // console.log("Creating User:", req.body);
        //Call the service function
        const result = await userService.createUser(
            role_id, uu_id, firstName, lastName, email, contact, 
            address, userName, password, photo, created_by
        );

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            result: req.body,
            data: result
           
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Call service function to get users
        const users = await userService.getAllUsers();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { uu_id, password } = req.body;
console.log("requist", req.body)
        // Validate required fields
        if (!uu_id || !password) {
            return res.status(400).json({ message: "UUID and Password are required" });
        }

        // Call the login service
        const { token, roleId } = await userService.loginUser(uu_id, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            RoleId: roleId,
        });
        console.log("result",  token, roleId );
        

    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};


module.exports = { createUser, getAllUsers, loginUser};
