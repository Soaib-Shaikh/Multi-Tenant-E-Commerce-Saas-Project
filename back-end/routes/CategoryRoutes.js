import express from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/CategoryController.js";


import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();


// Create Category
router.post(
  "/",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("seller", "seller_staff"),
  upload.single("image"),
  createCategory
);


// Get All Categories
router.get(
  "/",
  authMiddleware,
  tenantMiddleware,
  getCategories
);


// Get Single Category
router.get(
  "/:id",
  authMiddleware,
  tenantMiddleware,
  getCategoryById
);


// Update Category
router.put(
  "/:id",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("seller", "seller_staff"),
  upload.single("image"),
  updateCategory
);


// Delete Category
router.delete(
  "/:id",
  authMiddleware,
  tenantMiddleware,
  roleMiddleware("seller", "seller_staff"),
  deleteCategory
);


export default router;