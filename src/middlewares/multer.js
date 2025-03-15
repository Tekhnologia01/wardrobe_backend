const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Uploads = path.join(__dirname, '../Uploads'); // Absolute path

// // Ensure the directory exists
// if (!fs.existsSync(Uploads)) {
//     fs.mkdirSync(Uploads, { recursive: true });
// }

// Configure storage with correct absolute path
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, Uploads); // Use absolute path instead of 'Uploads/'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
    }
});

// File filter for images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Middleware for image uploads
const upload = multer({ storage, fileFilter });

module.exports = upload;
