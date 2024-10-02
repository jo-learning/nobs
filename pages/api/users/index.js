// import { register } from '../../../controller/test';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     await register(req, res);
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
import { register, login } from '../../../controller/authController';

export default async function handler(req, res){
  await register(req, res);
}