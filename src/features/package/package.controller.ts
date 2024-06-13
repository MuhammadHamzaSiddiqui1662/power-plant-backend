// src/features/package/package.controller.ts
import { Router } from "express";
import { getAllPackages, createPackage, getPackageById, updatePackage, deletePackage } from "./package.service";

const router = Router();

router.get("/", getAllPackages);
router.post("/", createPackage);
router.get("/:id", getPackageById);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

export const PackageRouter = router;
