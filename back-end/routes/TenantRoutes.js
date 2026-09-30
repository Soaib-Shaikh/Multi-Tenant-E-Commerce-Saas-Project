import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

import {
    createTenant,
    getTenantById,
    getAllTenants,
    approveTenant,
    rejectTenant
} from "../controllers/TenantController.js";

import tenantMiddleware from "../middlewares/tenantMiddleware.js";

const router = express.Router();

// Super Admin creates a Tenant
router.post(
    "/",
    authMiddleware,
    roleMiddleware("super_admin"),
    createTenant
);

// Get all Tenants - Super Admin
router.get(
    "/",
    authMiddleware,
    roleMiddleware("super_admin"),
    getAllTenants
);

// Get single Tenant
router.get(
    "/:id",
    authMiddleware,
    tenantMiddleware,
    getTenantById
);

// Approve Tenant - Super Admin
router.patch(
    "/:id/approve",
    authMiddleware,
    roleMiddleware("super_admin"),
    approveTenant
);

// Reject Tenant - Super Admin
router.patch(
    "/:id/reject",
    authMiddleware,
    roleMiddleware("super_admin"),
    rejectTenant
);

export default router;