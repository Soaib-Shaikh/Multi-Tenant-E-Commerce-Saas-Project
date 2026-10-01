import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    requestCancelOrder,
    requestReturnOrder
} from "../controllers/OrderController.js";

const router = express.Router();

// CUSTOMER - CREATE ORDE

router.post(
    "/",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    createOrder
);

// CUSTOMER - GET MY ORDER

router.get(
    "/",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    getMyOrders
);

// CUSTOMER - GET SINGLE ORDE

router.get(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    getOrderById
);

// CUSTOMER - CANCEL REQUES

router.patch(
    "/:id/cancel-request",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    requestCancelOrder
);

// CUSTOMER - RETURN REQUES
router.patch(
    "/:id/return-request",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    requestReturnOrder
);

// SELLER - UPDATE ORDER STATUS
router.patch(
    "/:id/status",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller"),
    updateOrderStatus
);

export default router;