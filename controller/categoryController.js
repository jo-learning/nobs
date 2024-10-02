// pages/api/auth/categoryController.js

import Category from '../models/category'; // Adjust this path to where your models are 
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to set this in your .env file

// create new category
export const create = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST method allowed' });
    }
    const { nameEn, nameTg, descriptionEn, descriptionTg} = req.body;

    if (!nameEn || !nameTg || !descriptionEn || !descriptionTg) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // Check if category exists
        const existingCategory = await Category.findOne({ where: { name_en: nameEn } });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // creating id
        const id = uuidv4();

        // Create new category
        const newCategory = await Category.create({
            id,
            name_en: nameEn,
            description_en: descriptionEn,
            name_tg: nameTg,
            description_tg: descriptionTg
        });

        res.status(201).json({
            message: 'Category Created successfully',
            category: { id: newCategory.id, name: newCategory.name_en },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// get category
export const getCategory = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET method allowed' });
    }


    try {
        // Get all the Categories
        const allCategory = await Category.findAll();

        res.status(200).json({
            message: 'All Category',
            allCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default {
    create,
    getCategory
};
