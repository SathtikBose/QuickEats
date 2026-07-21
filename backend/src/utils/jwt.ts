import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export const generateToken = (payload: object, expiresIn: string | number = '7d'): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
