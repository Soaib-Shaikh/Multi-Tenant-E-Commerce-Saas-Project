import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from "../controllers/CartController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("customer"),
  addToCart
);

router.get(
  "/",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("customer"),
  getCart
);

router.put(
  "/:productId",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("customer"),
  updateCartItem
);

router.delete(
  "/:productId",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("customer"),
  removeFromCart
);

router.delete(
  "/",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("customer"),
  clearCart
);

export default router;