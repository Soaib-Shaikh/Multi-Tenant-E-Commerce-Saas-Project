import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js"
import roleMiddleware from "../middlewares/roleMiddleware.js"
import upload from "../middlewares/upload.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/ProductController.js";

const router = express.Router();

//Create Product
router.post("/",
        authMiddleware,
        tenantMiddleware,
        roleMiddleware("seller", "seller_staff"),
        upload.array("images", 10),
        createProduct
    )

// Get All Products
router.get(
    "/",
    authMiddleware,
    tenantMiddleware,
    getProducts
);


// Get Single Product
router.get(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    getProductById
);


// Update Product
router.put(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller", "seller_staff"),
    upload.array("images", 5),
    updateProduct
);


// Delete Product
router.delete(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    roleMiddleware("seller", "seller_staff"),
    deleteProduct
);

export default router;