// const { User } = require('../models');
const { generateToken, hashPassword, comparePassword } = require('../utils/auth');
import User from '@/models/user';

exports.register = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // const hashedPassword = await hashPassword(password);
    // const user = await User.create({ email, password: hashedPassword });
    // const token = generateToken(user);
    const user = await User.create({id:"0001", firstName: "yohanes", lastName: "guesh", email: "jojo@gmail.com", password: "yohannes", phone: "0911221122"})
    res.status(201).json({ user });
  } catch (e) {
    console.log(e)
    res.status(400).json({ error1: 'Bad Request' , error2: e});
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && (await comparePassword(password, user.password))) {
      const token = generateToken(user);
      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
