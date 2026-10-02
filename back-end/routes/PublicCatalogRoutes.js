import express from "express";
import { getPublicProductById, getPublicProducts } from "../controllers/PublicCatalogController.js";

const router = express.Router();

// Public read-only catalog endpoints. tenantId is required so public reads stay store-scoped.
router.get("/products", getPublicProducts);
router.get("/products/:id", getPublicProductById);

export default router;
