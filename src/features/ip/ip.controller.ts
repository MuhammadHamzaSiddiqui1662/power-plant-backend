import { Router } from "express";
import {
  createIP,
  getAllIPs,
  getIPById,
  updateIP,
  deleteIP,
  getIPDetailsById,
  publishIp,
  getMyIps,
} from "./ip.service";
import { authExtractUser, authMiddleware } from "../auth/auth.middleware";
import { upload } from "../upload/upload.middleware";

const router = Router();

router.get("/", authExtractUser, getAllIPs);
router.get("/my-ips", authMiddleware, getMyIps);
router.get("/:id", getIPById);
router.get("/:id/details", authMiddleware, getIPDetailsById);
router.put("/:id/publish", authMiddleware, publishIp);
router.post("/", authMiddleware, upload.any(), createIP);
router.put("/", authMiddleware, upload.any(), updateIP);
router.delete("/:id", authMiddleware, deleteIP);

export const IPRouter = router;
