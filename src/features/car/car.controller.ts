import { Router } from "express";
import {
  getAllCars,
  createCar,
  getCarById,
  updateCar,
  deleteCar,
} from "./car.service";

const router = Router();

router.get("/", getAllCars);
router.post("/", createCar);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export const CarRouter = router;
