import { updateuser } from "@/controller/userController";
import { authenticate } from "@/middleware/auth";

const handler = async(req, res) => {
    const { id } = req.query;
    await updateuser(req, res);

}
export default authenticate(handler);