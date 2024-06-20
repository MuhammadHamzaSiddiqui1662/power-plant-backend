import { Router } from "express";
import { getAllChats, createChat, getChatById, updateChat, deleteChat } from "./chat.service";

const router = Router();

router.get("/", getAllChats);
router.post("/", createChat);
router.get("/:id", getChatById);
router.put("/:id", updateChat);
router.delete("/:id", deleteChat);

export const ChatRouter = router;
