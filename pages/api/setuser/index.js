import { v4 as uuidv4 } from 'uuid';
import { setCookie, parseCookies } from '../../../lib/cookie';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const cookies = parseCookies(req);
        
        // Set the user ID only if it does not exist
        if (!cookies.userId) {
            const userId = uuidv4(); // Generate a new unique ID
            setCookie(res, 'userId', userId);
            return res.status(200).json({ message: 'User ID set in cookie', userId });
        }

        return res.status(200).json({ message: 'User ID already exists', userId: cookies.userId });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
