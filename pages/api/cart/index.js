import { authenticate } from '@/middleware/auth';
import { addCart } from '../../../controller/cartController';

const handler = async(req, res)=>{
  await addCart(req, res);
}
export default authenticate(handler);