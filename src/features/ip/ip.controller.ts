import { Router } from "express";
import {
  createIP,
  getAllIPs,
  getIPById,
  updateIP,
  deleteIP,
  getIPDetailsById,
  publishIp,
} from "./ip.service";
import { authMiddleware } from "../auth/auth.middleware";
import { upload } from "../upload/upload.middleware";

const router = Router();

router.get("/", getAllIPs);
router.get("/:id", getIPById);
router.get("/:id/details", authMiddleware, getIPDetailsById);
router.put("/:id/publish", authMiddleware, publishIp);
router.post("/", authMiddleware, upload.any(), createIP);
router.put("/:id", authMiddleware, updateIP);
router.delete("/:id", authMiddleware, deleteIP);

export const IPRouter = router;
