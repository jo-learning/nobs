import { searchProducts } from '../../../../controller/productController';

export default async function handler(req, res){
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Only POST method allowed" });
      }
    // req.body.id = req.query;
    await searchProducts(req, res);
}