import express from "express";
import { 
    getAllUsers,
    getMe,
    getUserById,
    loginUser, 
    registerUser ,
} from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser)

// Login User
router.post("/login", loginUser)

// Get me by login user
router.get("/me", authMiddleware, getMe)

// Get all users
router.get("/", authMiddleware, roleMiddleware("super_admin"), getAllUsers)

// Geet a single user by ID
router.get("/:id", authMiddleware, roleMiddleware("super_admin"), getUserById)
export default router;