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
} from "./user.service";
import { upload } from "../upload/upload.middleware";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.put("/:id", upload.single("image"), updateUser);
router.delete("/:id", deleteUser);
router.get("/profile", getProfileDetails);
router.get("/ips", getIPs);
router.post("/:id/:reviewType/reviews", addReview);
router.post("/:id/certificates", upload.single("image"), addCertificate);
router.delete("/:id/certificates/:certificateId", deleteCertificate);

export const UserRouter = router;
