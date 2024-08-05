import { Router } from "express";
import { loginAdmin, registerAdmin } from "../auth/auth.service";
import { getAllIPs } from "./admin.service";

const router = Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);

router.get("/ips", getAllIPs);

export const AdminRouter = router;
