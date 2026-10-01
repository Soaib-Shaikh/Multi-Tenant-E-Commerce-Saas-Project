import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    createCoupon,
    getSellerCoupons,
    updateCoupon,
    deleteCoupon,
    validateCoupon
} from "../controllers/CouponController.js";

const router = express.Router();


// SELLER - CREATE COUPON

router.post(
    "/",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller"),
    createCoupon
);


// SELLER - GET ALL COUPONS

router.get(
    "/",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller"),
    getSellerCoupons
);


// SELLER - UPDATE COUPON

router.put(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller"),
    updateCoupon
);

// SELLER - DELETE COUPON

router.delete(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller"),
    deleteCoupon
);


// CUSTOMER - VALIDATE / APPLY COUPON

router.post(
    "/validate",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    validateCoupon
);

export default router;