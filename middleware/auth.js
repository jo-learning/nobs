// middleware/auth.js

import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticate = (handler) => async (req, res) => {
    try {
        // Parse cookies from the request
        const { authToken } = cookie.parse(req.headers.cookie || '');
  
        // If no authToken is present, return not authenticated
        if (!authToken) {
          return res.status(401).json({ message: 'Authentication required' });
        }
  
        // Verify the JWT token
        const decoded = jwt.verify(authToken, JWT_SECRET);
  
        // Attach the decoded user info to the request object (optional)
        req.user = decoded;
  
        // Proceed to the handler (controller)
        return handler(req, res);
      } catch (error) {
        // Token verification failed or no token found
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
};
