
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    getAdminDashboard,
    getAllAdminProducts,
    getAllAdminOrders,
    updateAdminProduct,
    deleteAdminProduct,
} from "../controllers/AdminDashboardController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("super_admin"));

router.get("/", getAdminDashboard);

router.get("/products", getAllAdminProducts);
router.put("/products/:id", updateAdminProduct);
router.delete("/products/:id", deleteAdminProduct);

router.get("/orders", getAllAdminOrders);


export default router;