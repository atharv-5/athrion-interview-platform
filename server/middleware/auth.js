import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Fail fast at startup if this isn't set — never fall back to a hardcoded secret
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables. Server will not start.');
}

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === 'null' || token === 'undefined') {
    return res.status(401).json({ message: 'Not authorized, invalid token format' });
  }

  // Mock auth for local testing ONLY — strictly disabled in production / non-development environments
  const isDev = process.env.NODE_ENV === 'development';
  const mockAuthEnabled = isDev && process.env.ALLOW_MOCK_AUTH === 'true';

  if (mockAuthEnabled && token.startsWith('user_mock_')) {
    req.user = {
      id: 'user_mock_123',
      name: 'Mock User',
      email: 'mock@example.com',
    };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    console.error('Token authentication failure:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired, please log in again', expired: true });
    }

    return res.status(401).json({ message: 'Not authorized, token validation failed' });
  }
};