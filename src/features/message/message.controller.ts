import { Router } from "express";
import { getAllMessages, createMessage, getMessageById, updateMessage, deleteMessage } from "./message.service";

const router = Router();

router.get("/", getAllMessages);
router.post("/", createMessage);
router.get("/:id", getMessageById);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);

export const MessageRouter = router;
