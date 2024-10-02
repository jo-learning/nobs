import { productById } from '../../../../controller/productController';

export default async function handler(req, res){
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Only GET method allowed" });
      }
    // req.body.id = req.query;
    await productById(req, res);
}