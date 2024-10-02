import { getProduct, getProductByCategory } from '../../../controller/productController';

export default async function handler(req, res){
    const { id } = req.query;
  if ( id === 'allproduct'){
    await getProduct(req, res);
  }
  else{
    await getProductByCategory(req, res);
  }
}