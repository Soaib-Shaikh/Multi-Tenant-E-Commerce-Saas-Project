import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// Create a new user
export const registerUser = async(req, res) => {
    try {
        const {name, email, password, role, tenantId} = req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message: "Please provide all required fields."});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists."});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role,
            tenantId: tenantId || null,
        })

        res.status(201).json({message: "User registered successfully.", user: newUser});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Internal Server Error.");
            
    }
}

//Login User
export const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Please provide all required fields."});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found."})
        }

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(400).json({message: "Invalid credentials."});
        }

        const token = jwt.sign({
            userId: user._id,
            role: user.role,
            tenantId: user.tenantId
        }, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({message: "User logged in successfully.", user, token});

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Internal Server Error.");
    }
}

// Get all users
export const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find().select("-password");
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Internal Server Error.");
    }
} 

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Internal Server Error.");
    }
}

// Get logged-in user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    res.status(200).json({
      message: "User fetched successfully.",
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};