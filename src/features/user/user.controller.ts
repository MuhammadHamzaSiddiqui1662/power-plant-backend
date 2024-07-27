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

export const UserRouter = router;
