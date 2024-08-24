import { CustomRequestHandler } from "../../types/common";
import { UserType } from "../../types/user";
import { Chat } from "./chat.entity";

export const getAllChats: CustomRequestHandler = async (req, res) => {
  try {
    const userType: number = Number(req.query?.userType);
    const { userId } = req.user;
    const chats = await Chat.find({
      [UserType[userType].toLowerCase()]: userId,
    }).populate("innovator investor broker ip");
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createChat: CustomRequestHandler = async (req, res) => {
  try {
    const newChat = new Chat(req.body);
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getChatById: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id).populate(
      "innovator investor broker ip"
    );
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHiringDetails: CustomRequestHandler = async (req, res) => {
  try {
    console.log("req.query", req.query);
    const chat = await Chat.findOne(req.query).populate(
      "innovator investor broker ip"
    );
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMyBrokers: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user;
    const hirings = await Chat.find({
      investor: userId,
      broker: { $ne: null },
      closed: false,
    }).populate("investor broker ip");
    res.status(200).json(hirings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMyInvestors: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user;
    const hirings = await Chat.find({
      broker: userId,
      investor: { $ne: null },
      closed: false,
    }).populate("investor broker ip");
    res.status(200).json(hirings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateChat: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const updatedChat = await Chat.findByIdAndUpdate(id, req.body);

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
