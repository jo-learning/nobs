import { login, logout } from '../../../controller/authController';

export default async function handler(req, res){
    const { id } = req.query;
  if ( id === 'login'){
    await login(req, res);
  }
  else if (id === 'logout'){
    await logout(req, res);
  }
}