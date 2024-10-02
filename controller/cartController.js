// pages/api/auth/authController.js

import { v4 as uuidv4 } from "uuid";
import ShoppingCart from "@/models/shoppingcart";
import CartItem from "@/models/cartitem";
import Product from "@/models/product";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Make sure to set this in your .env file

// Register new user
export const addCart = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method allowed" });
  }
  console.log(req.body);
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  // TODO: //from middleware use user_id = req.user.id
  const user_id = req.user.id;

  try {
    // Check if user exists
    const existingCart = await ShoppingCart.findOne({ where: { user_id } });
    if (!existingCart) {
      return res.status(400).json({ message: "Cart Not Founded" });
    }
    const existingCart1 = await CartItem.findOne({where: {cart_id: existingCart.id, product_id }})
    if(existingCart1){
        return res.status(400).json({ message: "Item already Added to Cart" });
    }
    // creating id
    const id = uuidv4();
    const newCart = await CartItem.create({
      id,
      cart_id: existingCart.id,
      product_id,
      quantity,
    });
    return res
      .status(200)
      .json({ message: "Cart Item Added", cartitem: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get cart for a user
export const getCard = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET method allowed" });
  }

  // TODO: //from middleware use user_id = req.user.id
  const user_id = req.user.id;

  try {
    // Check if user exists
    const existingCart = await ShoppingCart.findOne({ where: { user_id } });
    if (!existingCart) {
      return res.status(400).json({ message: "Cart Not Founded" });
    }
    const Cart = await CartItem.findAll({
      where: { cart_id: existingCart.id },
    });
    if (Cart) {
      console.log(Cart[0].id)
      let carts = []
      for(let i=0; i < Cart.length; i++){
        const prod = await Product.findOne({where: { id: Cart[i].product_id }})
        carts.push({
          id: Cart[i].id,
          name: prod.name_en,
          price: prod.price,
          quantity: Cart[i].quantity,
          image: prod.image_url
        })
      }

      return res
        .status(200)
        .json({ message: "Cart Item Added", cartitem: carts });
    } else {
      return res.status(200).json({ message: "no Item In Card" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getCardForCounter = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET method allowed" });
  }

  // TODO: //from middleware use user_id = req.user.id
  const user_id = req.user.id;

  try {
    // Check if user exists
    const existingCart = await ShoppingCart.findOne({ where: { user_id } });
    if (!existingCart) {
      return res.status(400).json({ message: "Cart Not Founded" });
    }
    const Cart = await CartItem.findAll({
      where: { cart_id: existingCart.id },
    });
    

      return res
        .status(200)
        .json({ message: "Cart Item ", cartitem: Cart});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




// get cart for a user
export const deleteCard = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Only DELETE method allowed" });
  }

  // TODO: //from middleware use user_id = req.user.id
  const user_id = req.user.id;
  const { id } = req.query;

  try {
    // Check if user exists
    const existingCart = await ShoppingCart.findOne({ where: { user_id } });
    if (!existingCart) {
      return res.status(400).json({ message: "Cart Not Founded" });
    }
    const existingCart1 = await CartItem.findOne({ where: { id, cart_id: existingCart.id } })
    if(!existingCart1){
      return res.status(400).json({ message: "Cart Not Founded" });
    }
    await CartItem.destroy({where: {id, cart_id: existingCart1.cart_id}})
    return res.status(200).json({message: "Cart Item Deleted"}) 
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  addCart,
  getCard,
  deleteCard,
  getCardForCounter
};
