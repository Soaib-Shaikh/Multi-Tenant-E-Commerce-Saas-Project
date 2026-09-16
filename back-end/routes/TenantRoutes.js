import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { createTenant, getTenantById } from "../controllers/TenantController.js";
import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

// Create a new Tenant
router.post("/", authMiddleware, roleMiddleware("super_admin"), createTenant);

// Get a single Tenant by ID
router.get("/:id", authMiddleware, tenantMiddleware ,getTenantById)

export default router;