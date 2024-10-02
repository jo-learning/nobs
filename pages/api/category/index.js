import { create } from '../../../controller/categoryController';

export default async function handler(req, res){
  await create(req, res);
}