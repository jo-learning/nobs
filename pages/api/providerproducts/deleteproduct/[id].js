import { deleteProduct } from '@/controller/otherController';
import { authenticate } from '@/middleware/auth';

const handler = async(req, res) => {
    await deleteProduct(req, res);
}
export default authenticate(handler);