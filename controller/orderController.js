import { v4 as uuidv4 } from "uuid";
import Order from "@/models/order";

import { Op } from "sequelize";
import Transaction from "@/models/transaction";
import NodeMailer from "@/config/nodemailer";
import cart from "@/pages/api/cart";
export const create = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method allowed" });
  }
  const shippingCost = 5.99;
  const taxes = 2.5;
  const { cartItems, shipping_address, transaction_number, paymentMethod } =
    req.body;
  const session = req.session;
  // console.log(session)
  if (
    !cartItems ||
    !shipping_address ||
    !transaction_number ||
    !session ||
    !paymentMethod
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  // console.log(cartItems)
  const user_id = req.user.id
  

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total_price = subtotal + taxes + shippingCost;

  try {


    if (cartItems.length === 0){
      return res.status(400).json({ message: "Your checkOut is empty" });
    }
    const checkuser = await Order.findAll({where: {session, status:"pending"}})
    // console.log(checkuser)
    if (checkuser.length > 3){
      return res.status(400).json({message: "You added a lot of products please pay first"})
    }
    const checkagain = await Order.findOne({where: {session, total_price, shipping_address, transaction_number}})
    if (checkagain){
      return res.status(400).json({message: "You allready ordered please contact customer service"})
    }

    // creating id
    const order_id = uuidv4();

    // Create new category
    const newOrder = await Order.create({
      id: order_id,
      user_id,
      total_price,
      shipping_address,
      transaction_number,
      session,
      payment_method: paymentMethod
    });
    const checkTransaction = await Transaction.findOne({
      where: { transaction_number, check: "false" },
    });
    if (checkTransaction) {
      const updateOrder = await Order.update({ status: "completed" },{where: {id: order_id}});
    }
    const send = await NodeMailer({
      to: shipping_address.email,
      subject: "Your Order Confirmation - [Order Number]",
      text: `Dear ${shipping_address.firstName},

Thank you for shopping with us! We are excited to inform you that your order [Order Number] has been successfully received and is currently being processed.
Order Details:

http://localhost:3000/order/${newOrder.id}

You will receive another email once your order has been shipped, along with tracking details to follow its journey to your doorstep.

If you have any questions regarding your order, feel free to reply to this email or contact our support team at [Support Email].

Thank you for choosing Nobsmart, and we hope you enjoy your purchase!

Best regards,
Nobsmart
+251900000000`
    });
    console.log(send);
    return res.status(201).json({
      message: "Order Created successfully",
      transaction_id: { id: newOrder.id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get product
export const getOrder = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET method allowed" });
  }
  const { id } = req.query;
  console.log(id)
  try {
    // Get all the Categories
    const order = await Order.findOne({ where: { id }, attributes: {exclude: ['user_id', 'session']}});

    return res.status(200).json({
      message: "Orders",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default {
  create,
  getOrder,
};
