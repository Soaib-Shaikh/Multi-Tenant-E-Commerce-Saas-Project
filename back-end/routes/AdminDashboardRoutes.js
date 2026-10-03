
import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    getAdminDashboard,
    getAllAdminProducts,
    getAllAdminOrders
} from "../controllers/AdminDashboardController.js";

const router = express.Router();

// All routes require Super Admin authentication
router.use(authMiddleware);
router.use(roleMiddleware("super_admin"));

// Dashboard Stats
router.get("/", getAdminDashboard);

// All Products
router.get("/products", getAllAdminProducts);

// All Orders
router.get("/orders", getAllAdminOrders);

export default router;