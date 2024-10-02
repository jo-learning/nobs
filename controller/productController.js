// pages/api/auth/categoryController.js

import Product from "../models/product"; // Adjust this path to where your models are
import Category from "@/models/category";
import { v4 as uuidv4 } from "uuid";
import authController from "./authController";
import User from "@/models/user";
import CartItem from "@/models/cartitem";
import { Op } from "sequelize";
import ProviderProduct from "@/models/providerproduct";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Make sure to set this in your .env file

// create new category
export const create = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method allowed" });
  }
  const {
    nameEn,
    nameTg,
    descriptionEn,
    descriptionTg,
    categoryId,
    price,
    stockQuantity,
  } = req.body.data;
  const imageUrl = req.body.imageUrl;    
  console.log(imageUrl)

  if (
    !nameEn ||
    !nameTg ||
    !descriptionEn ||
    !descriptionTg ||
    !categoryId ||
    !price ||
    !stockQuantity ||
    !imageUrl
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Check if category exists
    const existingCategory = await Product.findOne({
      where: { name_en: nameEn },
    });
    if (existingCategory) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // creating id
    const id = uuidv4();
    const priceInt = parseInt(price);
    const stockQuantityFloat = parseFloat(stockQuantity);

    // Create new category
    const newProduct = await Product.create({
      id,
      name_en: nameEn,
      description_en: descriptionEn,
      name_tg: nameTg,
      description_tg: descriptionTg,
      price: priceInt,
      category_id: categoryId,
      stock_quantity: stockQuantityFloat,
      image_url: imageUrl,
    });

    res.status(201).json({
      message: "Product Created successfully",
      category: { id: newProduct.id, name: newProduct.name_en },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get product
export const getProduct = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET method allowed" });
  }

  try {
    // Get all the Categories
    const allProduct = await Product.findAll();

    res.status(200).json({
      message: "All Product",
      allProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// get product
export const getProviderProduct = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET method allowed" });
  }

  try {
    // Get all the Categories
    let allProduct
    let user = []
    if (req.user.role == 'admin'){
    allProduct = await ProviderProduct.findAll();
      for (let i=0; i<allProduct.length; i++){
        const a = await User.findOne({where: {id: allProduct[i].user_id}})
        user.push(a);
      }
      // console.log(user)
  }
  
    else{
      res.status(400).json({
        message: "You are not Admin",
      });
    }


    res.status(200).json({
      message: "All Product",
      allProduct,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




export const productById = async (req, res) => {
  try {
    // Get all the Categories
    const { id } = req.query;
    const prod = await Product.findByPk(id);
    // console.log(product)
    res.status(200).json({
      message: "One Product",
      product: prod,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

}


// get product
export const getProductByCategory = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET method allowed" });
  }

  try {
    // Get all the Categories
    const { id } = req.query;
    const category = await Category.findOne({where: {name_en: id}});
    if(!category){
      return res.status(405).json({ message: "no Category" });
    }
    const product = await Product.findAll({where: {category_id: category.id}})

    res.status(200).json({
      message: "Products",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get cart for a user
export const deleteProduct = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Only DELETE method allowed" });
  }

  // TODO: //from middleware use user_id = req.user.id
  const user_id = "41d3fb6d-40a6-4a04-85fb-77b16febf609";
  const { id } = req.query;

  try {
    // Check if user exists
    const checkAdmin = await User.findOne({where: {id: user_id}})
    if (!checkAdmin) {
      return res.status(400).json({ message: "User Not Founded" });
    }
    else if (checkAdmin.role !== "admin"){
      return res.status(400).json({ message: "User Not Admin" });
    }
    await CartItem.destroy({where: {product_id: id}})
    await Product.destroy({where: {id}})
    return res.status(200).json({message: "Product Item Deleted"}) 
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchProduct = async(req, res) =>{
  const { minPrice, maxPrice } = req.body;

  let whereClause = {};

  // If minPrice and maxPrice are provided, filter by price range
  if (minPrice && maxPrice) {
    whereClause = {
      price: {
        [Op.between]: [Number(minPrice), Number(maxPrice)],
      },
    };
  }
  try {
    const items = await Product.findAll({
      where: whereClause,
    });
    res.status(200).json({message: "searched products", items});
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data from database' });
  }

}



export default {
  create,
  getProduct,
  productById,
  getProductByCategory,
  deleteProduct,
  searchProduct,
  getProviderProduct
};
