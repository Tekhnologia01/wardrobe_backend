const express = require("express");
const Router = express.Router();
const upload = require('../middlewares/multer'); 

const Users = require('../modules/users/controllers/userController')
const categoryController = require('../modules/masters/controllers/categoryController');
const subCategoryController = require('../modules/masters/controllers/subCategoryController')
const Product = require('../modules/Product/controllers/addProductController')
const Roles = require('../modules/masters/controllers/rolesController')

const { verifyToken } = require('../middlewares/authMiddleware');

Router.get('/protected', verifyToken, (req, res) => {
    res.json({
         message: 'This is a protected route',
         roleId: req.role_id,
         UserId: req.user_id,
         UUID : req.uu_id
        });
});


// roles
Router.post('/AddRoles', Roles.createRole);
Router.get('/GetAllRoles', Roles.getAllRoles);

// Users 
Router.post('/AddUser', Users.createUser);
Router.get('/GetAllUsers', Users.getAllUsers);
Router.post('/loginUser', Users.loginUser);

// Category 
Router.post('/addCategory', categoryController.addCategory);
Router.get('/GetAllCategories', categoryController.getAllCategories);
Router.put('/updateCategory/:id', categoryController.updateCategory);

// sub Category
Router.post('/addSubCategory', subCategoryController.addSubCategory);
Router.get('/GetAllSubCategory', subCategoryController.getAllSubCategories);
Router.put('/updateSubCatrgory/:id', subCategoryController.updateSubCategory);

// Products
Router.post('/addProduct',
    upload.fields([{ name: "photo", maxCount: 1 }]),
    Product.addProduct);
Router.get('/GetAllProducts', Product.getAllProducts);
Router.put('/updateFavouriteProductStatus/:id', Product.updateFavouriteProductStatus);



module.exports = Router;