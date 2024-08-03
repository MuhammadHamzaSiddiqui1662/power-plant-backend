// src/features/package/package.service.ts
import { CustomRequestHandler } from "../../types/common";
import { Package } from "./package.entity";

export const getAllPackages: CustomRequestHandler = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createPackage: CustomRequestHandler = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPackageById: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const packageItem = await Package.findById(id);
    if (!packageItem) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(packageItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePackage: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, description, price, features } = req.body;
    const packageItem = await Package.findById(id);
    if (!packageItem) {
      return res.status(404).json({ message: "Package not found" });
    }
    const updatedPackageItem = await Package.findByIdAndUpdate(id, req.body);
    res.status(200).json(updatedPackageItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePackage: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const packageItem = await Package.findByIdAndDelete(id);
    if (!packageItem) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
