import { Router } from "express";
import { createStripePaymentIntent } from "./stripe.service";

const router = Router();

router.get("/:packageType/:currency", createStripePaymentIntent);

export const StripeRouter = router;
