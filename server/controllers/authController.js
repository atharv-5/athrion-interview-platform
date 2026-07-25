import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/Schemas.js';
import { localDb } from '../utils/localDb.js';
import dotenv from 'dotenv';

dotenv.config();

const getJwtSecret = () => process.env.JWT_SECRET || 'super_secret_antigravity_token_key_12345';
const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || '30d';

const generateToken = (user) => {
  const id = user._id || user.id;
  return jwt.sign(
    { id, name: user.name, email: user.email }, 
    getJwtSecret(), 
    { expiresIn: getJwtExpiresIn() }
  );
};

export const register = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  name = name.trim();
  email = email.trim().toLowerCase();

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  const useLocal = process.env.USE_LOCAL_DB === 'true';

  try {
    let existingUser = null;

    if (useLocal) {
      existingUser = localDb.users.findOne({ email });
    } else {
      existingUser = await User.findOne({ email });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = null;

    if (useLocal) {
      newUser = localDb.users.create({
        name,
        email,
        password: hashedPassword
      });
    } else {
      newUser = await User.create({
        name,
        email,
        password: hashedPassword
      });
    }

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id || newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (err) {
    console.error('Registration controller error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  email = email.trim().toLowerCase();
  const useLocal = process.env.USE_LOCAL_DB === 'true';

  try {
    let user = null;

    if (useLocal) {
      user = localDb.users.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login controller error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  const useLocal = process.env.USE_LOCAL_DB === 'true';

  try {
    let user = null;
    const userId = req.user.id;

    if (useLocal) {
      user = localDb.users.findById(userId);
    } else {
      user = await User.findById(userId).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('getMe controller error:', err);
    res.status(500).json({ message: 'Server error retrieving profile' });
  }
};

