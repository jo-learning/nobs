import { getAllOrder } from "@/controller/orderController";
import { authenticate } from "@/middleware/auth";

const handler = async(req, res) => {
    await getAllOrder(req, res)
}

export default authenticate(handler);