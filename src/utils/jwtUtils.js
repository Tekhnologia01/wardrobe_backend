const jwtSecret = process.env.JWT_SECRET || 'tekhnologia';

const verifyToken = async (token) => {
  try {
    const jwt = await import('jsonwebtoken'); // Dynamic import
    return jwt.default.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = { verifyToken };
