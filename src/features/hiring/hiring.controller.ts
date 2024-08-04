import { Router } from "express";
import {
  getAllHirings,
  createHiring,
  updateHiring,
  deleteHiring,
  getMyBrokers,
  getMyInnvestors,
} from "./hiring.service";

const router = Router();

router.get("/", getAllHirings);
router.post("/", createHiring);
router.get("/brokers", getMyBrokers);
router.get("/innvestors", getMyInnvestors);
router.put("/:id", updateHiring);
router.delete("/:id", deleteHiring);

export const HiringRouter = router;
