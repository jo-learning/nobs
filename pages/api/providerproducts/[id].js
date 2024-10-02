import { authenticate } from '@/middleware/auth';
import { getProduct, getProductByCategory } from '../../../controller/otherController';
import { getProviderProduct } from '@/controller/productController';

const handler = async(req, res) =>{
    const { id } = req.query;
  if ( id === 'allproduct'){
    await getProduct(req, res);
  }
  else if(id === 'getproviderproduct'){
    await getProviderProduct(req, res)
  }
}
export default authenticate(handler);