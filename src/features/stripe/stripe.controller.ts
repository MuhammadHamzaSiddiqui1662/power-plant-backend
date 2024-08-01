import { Router } from "express";
import { createStripePaymentIntent } from "./stripe.service";

const router = Router();

router.post("/", createStripePaymentIntent);

export const StripeRouter = router;
