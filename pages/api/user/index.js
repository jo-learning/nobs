import { authenticate } from '@/middleware/auth';
import { create } from '../../../controller/userController';

const handler = async(req, res) => {
  await create(req, res);
}
export default authenticate(handler);