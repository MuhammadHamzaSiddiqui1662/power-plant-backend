import { CustomRequestHandler } from "../../types/common";
import { Chat } from "./chat.entity";

export const getAllChats: CustomRequestHandler = async (req, res) => {
    try {
        const chats = await Chat.find().populate("participants");
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createChat: CustomRequestHandler = async (req, res) => {
    try {
        const { participants } = req.body;
        const newChat = new Chat({
            participants,
        });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getChatById: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.findById(id).populate("participants");
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateChat: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { participants } = req.body;
        const chat = await Chat.findById(id);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        if (participants) chat.participants = participants;

        await chat.save();
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteChat: CustomRequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const chat = await Chat.findByIdAndDelete(id);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
};
