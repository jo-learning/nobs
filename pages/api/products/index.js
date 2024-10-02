import { authenticate } from '@/middleware/auth';
import { create } from '../../../controller/productController';

const handler = async(req, res) => {
  await create(req, res);
}
export default authenticate(handler);