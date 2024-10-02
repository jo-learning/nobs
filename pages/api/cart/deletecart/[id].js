import { authenticate } from '@/middleware/auth';
import { deleteCard } from '../../../../controller/cartController';

const  handler = async(req, res) => {
        await deleteCard(req, res);
}
export default authenticate(handler);