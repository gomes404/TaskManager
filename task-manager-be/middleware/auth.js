import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;