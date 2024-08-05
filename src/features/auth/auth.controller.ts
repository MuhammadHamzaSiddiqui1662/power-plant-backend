import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  refreshToken,
  registerUser,
  resendOTP,
  resetPassword,
  verifyOTP,
} from "./auth.service";
import { upload } from "../upload/upload.middleware";

const router = Router();

router.post("/login", loginUser);
router.post("/register", upload.any(), registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/refresh-token", refreshToken);
router.post("/resend-otp", resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export const AuthRouter = router;
