import { authenticate } from '@/middleware/auth';
import { create } from '../../../controller/otherController';

const handler = async(req, res) => {
  await create(req, res);
}
export default authenticate(handler);