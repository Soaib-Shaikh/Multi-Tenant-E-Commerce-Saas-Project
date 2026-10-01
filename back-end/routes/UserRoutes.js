import express from "express";

import {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    getMe,
    forgotPassword,
    resetPassword
} from "../controllers/UserController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();


// Register User / Seller
router.post(
    "/register",
    registerUser
);


// Login User
router.post(
    "/login",
    loginUser
);


// Get logged-in user
router.get(
    "/me",
    authMiddleware,
    getMe
);


// Get all users - Super Admin
router.get(
    "/",
    authMiddleware,
    roleMiddleware("super_admin"),
    getAllUsers
);


// Get single user - Super Admin
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("super_admin"),
    getUserById
);

// Forgot Password
router.post(
    "/forgot-password",
    forgotPassword
);

// Reset Password
router.post(
    "/reset-password/:token",
    resetPassword
);

export default router;