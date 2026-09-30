import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    getSellerDashboard
} from "../controllers/SellerDashboardController.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller"),
    getSellerDashboard
);

export default router;