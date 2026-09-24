import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// Create a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, tenantId } = req.body;

        // Required fields validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });
        }

        // Strong password validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters."
            });
        }

        const hasUppercase = [...password].some(
            (char) => char >= "A" && char <= "Z"
        );

        const hasLowercase = [...password].some(
            (char) => char >= "a" && char <= "z"
        );

        const hasNumber = [...password].some(
            (char) => char >= "0" && char <= "9"
        );

        const specialCharacters = "@$!%*?&";

        const hasSpecialCharacter = [...password].some(
            (char) => specialCharacters.includes(char)
        );

        if (!hasUppercase) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one uppercase letter."
            });
        }

        if (!hasLowercase) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one lowercase letter."
            });
        }

        if (!hasNumber) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one number."
            });
        }

        if (!hasSpecialCharacter) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least one special character."
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role,
            tenantId: tenantId || null
        });

        // Remove password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user: userResponse
        });
    } catch (error) {
        console.error("REGISTER USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Required fields validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Check user active status
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive."
            });
        }

        // Compare password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                tenantId: user.tenantId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            user: userResponse,
            token
        });
    } catch (error) {
        console.error("LOGIN USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error("GET ALL USERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("GET USER ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get logged-in user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully.",
            user
        });
    } catch (error) {
        console.error("GET ME ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};