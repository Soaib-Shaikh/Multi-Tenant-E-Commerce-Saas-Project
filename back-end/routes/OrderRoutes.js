import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
  createOrder,
  getMyOrders,
  getOrderById
} from "../controllers/OrderController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("customer"),
  createOrder
);

router.get(
  "/",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("customer"),
  getMyOrders
);

router.get(
  "/:id",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("customer"),
  getOrderById
);

export default router;