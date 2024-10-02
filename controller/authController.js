// pages/api/auth/authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user'; // Adjust this path to where your models are 
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie'
import ShoppingCart from '@/models/shoppingcart';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Make sure to set this in your .env file

// Register new user
export const register = async (req, res) => {
    //TODO: //create a shopping cart
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST method allowed' });
    }
    console.log(req.body);
    const { first_name, last_name, email, password, phone } = req.body;

    if (!first_name || !last_name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating id
        const id = uuidv4();

        // Create new user
        const newUser = await User.create({
            id,
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone
        });
        // creating id
        const idcart = uuidv4();
        const newShoppingCart = await ShoppingCart.create({
            id: idcart,
            user_id: id
        })
        // Generate JWT token
        const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
            expiresIn: '1h',
        });
        // Set HttpOnly cookie with the token
    res.setHeader('Set-Cookie', [cookie.serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/',
      }),
      cookie.serialize('role', newUser.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/',
      })]
    
    
    );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: newUser.id, name: newUser.first_name, email: newUser.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
export const login = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST method allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });
        // Set HttpOnly cookie with the token
    res.setHeader('Set-Cookie', [cookie.serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/',
      }),
      cookie.serialize('role', user.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production (HTTPS)
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
        path: '/',
      })]
    
    );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const logout = async(req, res) => {
    if (req.method === 'POST') {
      // Clear the authToken and role cookies
      res.setHeader(
        'Set-Cookie',
        [
          cookie.serialize('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0),
            sameSite: 'lax',
            path: '/',
          })
        ]
      );
      return res.status(200).json({ message: 'Logged out successfully' });
    }
  
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }


export default {
    register,
    login,
    logout
};
