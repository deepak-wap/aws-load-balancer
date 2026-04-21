import Guard from '../common/guards/guard.interface.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const JWT_SECRET = config.JWT_SECRET || 'your_secret_key_here';

export default class AuthGuard extends Guard {
    async canActivate(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader) return false;

        const token = authHeader.split(' ')[1]; // expecting: Bearer <token>
        if (!token) return false;

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // attach decoded payload to request
            return true;
        } catch (err) {
            return false;
        }
    }
}