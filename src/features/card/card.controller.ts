import { Router } from "express";
import { getAllCards, createCard, getCardById, updateCard, deleteCard } from "./card.service";

const router = Router();

router.get("/", getAllCards);
router.post("/", createCard);
router.get("/:id", getCardById);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

export const CardRouter = router;
