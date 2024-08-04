import { Router } from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
  resendOTP,
  verifyOTP,
} from "./auth.service";
import { upload } from "../upload/upload.middleware";

const router = Router();

router.post("/login", loginUser);
router.post("/register", upload.any(), registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/refresh-token", refreshToken);
router.post("/resend-otp", resendOTP);

export const AuthRouter = router;
