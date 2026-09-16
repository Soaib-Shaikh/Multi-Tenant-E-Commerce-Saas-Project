import express from "express";
import {
  createCategory,
  getCategories
} from "../controllers/CategoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import tenantMiddleware from "../middleware/tenantMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("seller", "seller_staff"),
  upload.single("image"),
  createCategory
);

router.get(
  "/",
  authMiddleware,
  tenantMiddleware,
  getCategories
);

export default router;