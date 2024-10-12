import { create } from "@/controller/orderController";
import { authenticatefororders } from "@/middleware/authfororder";

const handler = async(req, res) => {
    await create(req, res);
}
export default authenticatefororders(handler);