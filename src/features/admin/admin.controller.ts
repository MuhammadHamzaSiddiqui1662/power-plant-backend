import { Router } from "express";
import { loginAdmin, registerAdmin } from "../auth/auth.service";
import {
  getAllIPs,
  getAllUsers,
  getUserHirings,
  updateUser,
} from "./admin.service";

const router = Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

router.get("/ips", getAllIPs);
router.get("/hirings/:id", getUserHirings);

router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);

export const AdminRouter = router;
