import { getOrder } from "@/controller/orderController";
import { authenticatefororders } from "@/middleware/authfororder";

const handler = async(req, res) => {
    await getOrder(req, res);
}
export default authenticatefororders(handler);