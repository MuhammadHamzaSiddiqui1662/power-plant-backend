import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getIPs,
  getProfileDetails,
  addReview,
  addCertificate,
  deleteCertificate,
  getAllBrokers,
} from "./user.service";
import { upload } from "../upload/upload.middleware";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/", authMiddleware, upload.single("image"), updateUser);
router.get("/brokers", getAllBrokers);
router.get("/profile", authMiddleware, getProfileDetails);
router.get("/ips", authMiddleware, getIPs);
router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", authMiddleware, deleteUser);
router.post(
  "/:id/certificates",
  authMiddleware,
  upload.single("image"),
  addCertificate
);
router.delete(
  "/:id/certificates/:certificateId",
  authMiddleware,
  deleteCertificate
);
router.post("/:id/:reviewType/reviews", authMiddleware, addReview);

export const UserRouter = router;
