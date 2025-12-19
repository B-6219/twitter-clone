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

    if (password < 6 ){
      return res.status(400).json({error:'Password must be atleast 6 characters long'})
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
    console.log('Error in Sign Up controller', error.message);
  }
}

export const login = async (req, res) => {

  try {

    const {username ,password} = req.body
    const user = await User.findOne({username})
    const isPasswordValid = await bcrypt.compare(password, user?.password || " ")

    if (!user || !isPasswordValid) {
      return res.status(400).json({error:"invalid username or passwords"})
    }

    generateTokenAndSetCookie(user._id , res)
    res.status(200).json({
      _id :user._id,
      fullName:user.fullName,
      username: user.username,
      email:user.email,
      followers:user.followers,
      following:user.following,
      profileImg:user.profileImg,
      coverImg:user.coverImg
    })
    
  } catch (error) {
    res.status(500).json({message: "Server Error"});
    console.log('Error in Sign Up conroller', error.message);
  }
}

export const logout = async (req, res) => {

  try {

    res.cookie("jwt"," ",{maxAge:0})
    res.status(400).json({message:'Logged out Sucessfully'})

  } catch (error) {

    res.status(500).json({message: "Server Error"});
    console.log('Error in Log out controller', error.message);
  }
}

export  const getMe = async (req, res) => {
  
  try {
    
    const user = await User.findById()
  } catch (error) {
    
  }
}