const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully.', user_id: user._id });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: false, message: 'Invalid Username and password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: false, message: 'Invalid Username and password' });

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful.', jwt_token: token });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};