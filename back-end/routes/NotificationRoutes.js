import express from "express";
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/NotificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", authMiddleware, getNotifications);

router.patch("/:id/read", authMiddleware, markNotificationRead);

router.patch("/read-all", authMiddleware, markAllNotificationsRead);

export default router;