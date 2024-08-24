import { Router } from "express";
import {
  getAllChats,
  createChat,
  getChatById,
  updateChat,
  deleteChat,
  getMyBrokers,
  getMyInvestors,
  getHiringDetails,
} from "./chat.service";

const router = Router();

router.get("/", getAllChats);
router.post("/", createChat);
router.get("/hiring-details", getHiringDetails);
router.get("/brokers", getMyBrokers);
router.get("/investors", getMyInvestors);
router.get("/:id", getChatById);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);

export const ChatRouter = router;
