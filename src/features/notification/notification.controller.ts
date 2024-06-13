import { Router } from "express";
import { getAllNotifications, createNotification, getNotificationById, updateNotification, deleteNotification } from "./notification.service";

const router = Router();

router.get("/", getAllNotifications);
router.post("/", createNotification);
router.get("/:id", getNotificationById);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

export const NotificationRouter = router;
