import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    createPayment,
    refundPayment,
    verifyPayment
} from "../controllers/PaymentController.js";

const router = express.Router();


// Customer - Create Payment
router.post(
    "/create",
    authMiddleware,
    roleMiddleware("customer"),
    createPayment
);


// Customer - Verify Payment
router.post(
    "/verify",
    authMiddleware,
    roleMiddleware("customer"),
    verifyPayment
);


// Seller - Approve Refund
router.post(
    "/refund/:orderId",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller"),
    refundPayment
);

export default router;
