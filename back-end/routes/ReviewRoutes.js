import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
} from "../controllers/ReviewController.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    createReview
);

router.get(
    "/product/:productId",
    authMiddleware,
    tenantMiddleware,
    getProductReviews
);

router.put(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    updateReview
);

router.delete(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("customer"),
    deleteReview
);

export default router;