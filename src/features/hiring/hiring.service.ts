import { CustomRequestHandler } from "../../types/common";
import { Hiring } from "./hiring.entity";

export const getAllHirings: CustomRequestHandler = async (req, res) => {
  try {
    const hirings = await Hiring.find().populate("investor broker ip");
    res.status(200).json(hirings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMyBrokers: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from the token
    const hirings = await Hiring.find({ investor: userId }).populate(
      "investor broker ip"
    );
    res.status(200).json(hirings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMyInvestors: CustomRequestHandler = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from the token
    const hirings = await Hiring.find({ broker: userId }).populate(
      "investor broker ip"
    );
    res.status(200).json(hirings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createHiring: CustomRequestHandler = async (req, res) => {
  try {
    const { investor, broker, ip } = req.body;
    const newHiring = new Hiring({
      investor,
      broker,
      ip,
    });
    await newHiring.save();
    res.status(201).json(newHiring);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateHiring: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    // const { participants } = req.body;
    const hiring = await Hiring.findById(id);
    if (!hiring) {
      return res.status(404).json({ message: "Hiring not found" });
    }
    const newHiring = await Hiring.findByIdAndUpdate(id, req.body);
    res.status(200).json(newHiring);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteHiring: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const hiring = await Hiring.findByIdAndDelete(id);
    if (!hiring) {
      return res.status(404).json({ message: "Hiring not found" });
    }
    res.status(200).json({ message: "Hiring deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
