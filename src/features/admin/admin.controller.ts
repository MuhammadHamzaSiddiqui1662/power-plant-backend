import { Router } from "express";
import { loginAdmin, registerAdmin } from "../auth/auth.service";
import {
  getAllIPs,
  getAllUsers,
  getUserHirings,
  updateUser,
} from "./admin.service";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

router.get("/ips", authMiddleware, getAllIPs);
router.get("/hirings/:id", authMiddleware, getUserHirings);

router.get("/users", authMiddleware, getAllUsers);
router.put("/users/:id", authMiddleware, updateUser);

export const AdminRouter = router;
