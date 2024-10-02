import { authenticate } from '@/middleware/auth';
import { addRequest } from '@/controller/userController';

const handler = async(req, res) => {
  await addRequest(req, res);
}
export default authenticate(handler);