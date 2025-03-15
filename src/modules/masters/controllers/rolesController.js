const roleService = require("../services/rolesServices");

const createRole = async (req, res) => {
    try {
        const { role_type } = req.body;

        // Validate input
        if (!role_type) {
            return res.status(400).json({
                success: false,
                message: "Role type is required.",
            });
        }

        console.log("Creating Role:", role_type);

        // Call service function
        const result = await roleService.createRole(role_type);

        return res.status(201).json({
            success: true,
            message: "Role created successfully",
            result: req.body,
            data: result
        });

    } catch (error) {
        console.error("Error creating role:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.GetAllRoles();
        return res.status(200).json({
            success: true,
            message: 'roles retrieved successfully',
            data: roles,
        });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};


module.exports = { createRole, getAllRoles };
