import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    getAdminDashboard
} from "../controllers/AdminDashboardController.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    roleMiddleware("super_admin"),
    getAdminDashboard
);

export default router;