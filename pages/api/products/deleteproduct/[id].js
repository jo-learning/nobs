import { deleteProduct } from '@/controller/productController';

export default async function handler(req, res){
    await deleteProduct(req, res);
}