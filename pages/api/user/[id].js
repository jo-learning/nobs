import { getUser } from "@/controller/userController";

export default async function handler(req, res){
    const { id } = req.query;
  if ( id === 'allusers'){
    await getUser(req, res);
  }
}