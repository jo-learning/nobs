// pages/api/auth/categoryController.js

// import Product from "../models/product"; // Adjust this path to where your models are
import ProviderProduct from "@/models/providerproduct";
import Category from "@/models/category";
import { v4 as uuidv4 } from "uuid";
import authController from "./authController";
import User from "@/models/user";
import CartItem from "@/models/cartitem";
import { Op } from "sequelize";
import Request from "@/models/request";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Make sure to set this in your .env file

// create new category
// export const create = async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Only POST method allowed" });
//   }
//   const {
//     nameEn,
//     nameTg,
//     descriptionEn,
//     descriptionTg,
//     price,
//     stockQuantity,
//   } = req.body.data;
//   const imageUrl = req.body.imageUrl;    
//   console.log(imageUrl)

//   if (
//     !nameEn ||
//     !nameTg ||
//     !descriptionEn ||
//     !descriptionTg ||
//     !price ||
//     !stockQuantity ||
//     !imageUrl
//   ) {
//     return res.status(400).json({ message: "Please fill all fields" });
//   }

//   try {
//     // Check if category exists
//     const user = req.user.id
//     console.log(user)
//     const existingCategory = await ProviderProduct.findOne({
//       where: { name_en: nameEn },
//     });
//     if (existingCategory) {
//       return res.status(400).json({ message: "Product already exists" });
//     }

//     // creating id
//     const id = uuidv4();
//     const priceInt = parseInt(price);
//     const stockQuantityFloat = parseFloat(stockQuantity);
//     const categoryId = "752fb972-2323-4825-893a-6c27172fd917"
//     // Create new category
//     const newProduct = await ProviderProduct.create({
//       id,
//       name_en: nameEn,
//       description_en: descriptionEn,
//       name_tg: nameTg,
//       description_tg: descriptionTg,
//       price: priceInt,
//       category_id: categoryId,
//       stock_quantity: stockQuantityFloat,
//       image_url: imageUrl,
//       user_id: user
//     });

//     res.status(201).json({
//       message: "Product Created successfully",
//       category: { id: newProduct.id, name: newProduct.name_en },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// get product
export const getUser = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET method allowed" });
  }

  try {
    // Get all the Categories
    // const user = req.user.id
    const allrequest = await Request.findAll();
    let allusers = []
    for (let i=0; i<allrequest.length; i++){
        const user = await User.findOne({where: {id : allrequest[i].user_id}})
        allusers.push(user)
    }

    res.status(200).json({
      message: "All Product",
      allusers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const productById = async (req, res) => {
//   try {
//     // Get all the Categories
//     const { id } = req.query;
//     const prod = await Product.findByPk(id);
//     // console.log(product)
//     res.status(200).json({
//       message: "One Product",
//       product: prod,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }

// }


// get product
// export const getProductByCategory = async (req, res) => {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Only GET method allowed" });
//   }

//   try {
//     // Get all the Categories
//     const { id } = req.query;
//     const category = await Category.findOne({where: {name_en: id}});
//     if(!category){
//       return res.status(405).json({ message: "no Category" });
//     }
//     const product = await Product.findAll({where: {category_id: category.id}})

//     res.status(200).json({
//       message: "Products",
//       product,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// get cart for a user
export const deleteUser = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Only DELETE method allowed" });
  }

  // TODO: //from middleware use user_id = req.user.id
  const user_id = req.user.id;
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
    // await CartItem.destroy({where: {product_id: id}})
    await ProviderProduct.destroy({where: {id, user_id}})
    return res.status(200).json({message: "Product Item Deleted"}) 
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateuser = async (req, res) => {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Only GET method allowed" });
    }
  
    // TODO: //from middleware use user_id = req.user.id
    const user_id = req.user.id;
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
      // await CartItem.destroy({where: {product_id: id}})
      const check = await User.findOne({where: {id}})

      let updatedUser = {}
      if (check.role == "user"){
      updatedUser = await User.update({role: "provider"},{where: {id}})}
      else if (check.role == "provider"){
        updatedUser = await User.update({role: "user"},{where: {id}})}
      return res.status(200).json({message: "user updated sucessfully", updatedUser}) 
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const addRequest = async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST method allowed" });
    }
  
    // TODO: //from middleware use user_id = req.user.id
    const user_id = req.user.id;
    const { about } = req.body;

    if (!about){
      return res.status(400).json({ message: "Fill the Requirement" });
    }
  
    try {
      // Check if user exists
      
      const checkAdmin = await User.findOne({where: {id: user_id}})
      if (!checkAdmin) {
        return res.status(400).json({ message: "User Not Founded" });
      }
      const checkuser = await Request.findOne({where: {user_id}})
      if (checkuser){
        return res.status(400).json({ message: "you allready Requested" , newRequest: checkuser});
      }
      const id = uuidv4();
      const newRequest = await Request.create({
        id,
        about,
        user_id

      })
      return res.status(200).json({message: "request added successfully", newRequest}) 
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

// export const searchProduct = async(req, res) =>{
//   const { minPrice, maxPrice } = req.body;

//   let whereClause = {};

//   // If minPrice and maxPrice are provided, filter by price range
//   if (minPrice && maxPrice) {
//     whereClause = {
//       price: {
//         [Op.between]: [Number(minPrice), Number(maxPrice)],
//       },
//     };
//   }
//   try {
//     const items = await Product.findAll({
//       where: whereClause,
//     });
//     res.status(200).json({message: "searched products", items});
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Error fetching data from database' });
//   }

// }



export default {
//   create,
  getUser,
  updateuser,
  addRequest
//   productById,
//   getProductByCategory,
//   deleteProduct,
//   searchProduct
};
