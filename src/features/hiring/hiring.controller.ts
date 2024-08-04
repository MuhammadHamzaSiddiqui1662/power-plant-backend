import { Router } from "express";
import {
  getAllHirings,
  createHiring,
  updateHiring,
  deleteHiring,
  getMyBrokers,
  getMyInvestors,
} from "./hiring.service";

const router = Router();

router.get("/", getAllHirings);
router.post("/", createHiring);
router.get("/brokers", getMyBrokers);
router.get("/investors", getMyInvestors);
router.put("/:id", updateHiring);
router.delete("/:id", deleteHiring);

export const HiringRouter = router;
