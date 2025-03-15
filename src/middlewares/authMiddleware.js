const jwt = require('jsonwebtoken');

// Middleware to verify token and authorize user
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, 'wardrobe@99', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        console.log("decoded token ", decoded)
        req.role_id = decoded.role_id;
        req.user_id = decoded.user_id;  
        req.uu_id = decoded.uu_id;

        next(); 
    });
};

module.exports = { verifyToken };
