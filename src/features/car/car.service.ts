import { CustomRequestHandler } from "../../types/common";
import { Car } from "./car.entity";

export const getAllCars: CustomRequestHandler = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCar: CustomRequestHandler = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCarById: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCar: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndUpdate(id, req.body, { new: true });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCar: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
