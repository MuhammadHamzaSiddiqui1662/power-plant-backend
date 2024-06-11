import { Router } from "express";
import { loginUser, registerUser } from "./auth.service";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export const AuthRouter = router;
