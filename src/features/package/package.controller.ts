// src/features/package/package.controller.ts
import { Router } from "express";
import {
  getAllPackages,
  createPackage,
  getPackageById,
  updatePackage,
  deletePackage,
  getPackageByType,
} from "./package.service";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();

router.get("/", getAllPackages);
router.get("/type/:type", getPackageByType);
router.post("/", authMiddleware, createPackage);
router.get("/:id", getPackageById);
router.put("/:id", authMiddleware, updatePackage);
router.delete("/:id", authMiddleware, deletePackage);

export const PackageRouter = router;
