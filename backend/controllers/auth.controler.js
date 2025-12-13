import bcrypt from 'bcryptjs';
import User  from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';


export const signup = async (req, res) => {
  try {
    const {fullName , username , email , password} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
      return res.status(400).json({message: "Invalid email format"});
    }

    const existingUser = await User .findOne({username});
    if(existingUser){
      return res.status(400).json({message: "Username already taken"});
    }

    const existingEmail = await User .findOne({email});
    if(existingEmail){
      return res.status(400).json({message: "Email already taken"});
    }

    //hashed password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

    const newUser = new User ({
      fullName,
      username,
      email,
      password: hashedPassword
    });

    if(newUser){
      generateTokenAndSetCookie(newUser._id , res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    }
  } catch (error) {
    res.status(500).json({message: "Server Error"});
    
  }
}

export const login = async (req, res) => {
  res.json({
    data: "Login Route",
  });
}

export const logout = async (req, res) => {
  res.json({
    data: "Logout Route",
  });
}