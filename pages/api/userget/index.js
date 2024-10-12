import { getuser } from "@/controller/authController";
import { authenticate } from "@/middleware/auth";

const handler = async(req, res) => {
    await getuser(req, res);
}
export default authenticate(handler);