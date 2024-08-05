import { Router } from "express";
import { loginAdmin, registerAdmin } from "../auth/auth.service";
import { getAllIPs, getAllUsers } from "./admin.service";

const router = Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

router.get("/ips", getAllIPs);

router.get("/users", getAllUsers);

export const AdminRouter = router;
