import { getCategory } from '../../../controller/categoryController';

export default async function handler(req, res){
    const { id } = req.query;
  if ( id === 'allcategory'){
    await getCategory(req, res);
  }
}