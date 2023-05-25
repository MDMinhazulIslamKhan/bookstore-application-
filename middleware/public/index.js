import jwt from 'jsonwebtoken';

export const isUser = async (req, res, next) => {
    const token = req?.headers?.authorization;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const role = decoded.role;
        if (role === 'user') {
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized: Access Denied' });
        }
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
};