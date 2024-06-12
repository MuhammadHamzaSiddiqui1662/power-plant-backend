import { Router } from "express";
import { loginUser, refreshToken, registerUser, resendOTP, verifyOTP } from "./auth.service";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/refresh-token", refreshToken);
router.post("/resend-otp", resendOTP);

export const AuthRouter = router;
