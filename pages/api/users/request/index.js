import { getRequestById } from '@/controller/otherController';
import { authenticate } from '@/middleware/auth';
// import { register, login } from '../../../controller/authController';

const  handler = async(req, res) =>{
  await getRequestById(req, res);
}
export default authenticate(handler);