import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
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
  roleMiddleware("customer"),
  addToCart
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  getCart
);

router.put(
  "/:productId",
  authMiddleware,
  roleMiddleware("customer"),
  updateCartItem
);

router.delete(
  "/:productId",
  authMiddleware,
  roleMiddleware("customer"),
  removeFromCart
);

router.delete(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  clearCart
);

export default router;
