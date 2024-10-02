import { authenticate } from '@/middleware/auth';
import { getCard, getCardForCounter } from '../../../controller/cartController';

const handler = async(req, res)=>{
    const { id } = req.query;
    if (id == 'getcart'){
        await getCard(req, res);
    }
    else if (id == 'getcartforcounter'){
        await getCardForCounter(req, res);
    }
  
}
export default authenticate(handler);