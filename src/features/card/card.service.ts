import { CustomRequestHandler } from "../../types/common";
import { Card } from "./card.entity";
import { encrypt, decrypt } from "../../utils/encryption";

export const getAllCards: CustomRequestHandler = async (req, res) => {
    try {
        const cards = await Card.find().populate('userId', 'firstName lastName email');
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createCard: CustomRequestHandler = async (req, res) => {
    try {
        const { cardHolderName, cardNumber, expiryDate, cvv, userId } = req.body;
        const newCard = new Card({
            cardHolderName,
            cardNumber: encrypt(cardNumber),
            expiryDate,
            cvv: encrypt(cvv),
            userId: userId || req.user?.userId
        });
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getCardById: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await Card.findById(id).lean();
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        const decryptedCard = {
            ...card,
            cardNumber: decrypt(card.cardNumber),
            cvv: decrypt(card.cvv),
        };

        res.status(200).json(decryptedCard);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateCard: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        const { cardHolderName, cardNumber, expiryDate, cvv } = req.body;
        if (cardHolderName) card.cardHolderName = cardHolderName;
        if (cardNumber) card.cardNumber = encrypt(cardNumber);
        if (expiryDate) card.expiryDate = expiryDate;
        if (cvv) card.cvv = encrypt(cvv);

        await card.save();
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteCard: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        await Card.deleteOne({ _id: id });
        res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};
