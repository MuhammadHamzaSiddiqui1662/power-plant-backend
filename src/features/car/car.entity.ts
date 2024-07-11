import { Schema, model } from "mongoose";

interface ICar {
  title: string;
  description: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  type: string;
  condition: number;
  vin: string;
  zipCode: string;
  fuelType: string;
  driverType: string;
  transmission: string;
  cylinder: number;
  engineSize: number;
  registrationStatus: boolean;
  color: string;
  doors: number;
  price: number;
  features: string[];
  imageUrls: string[];
}

const carSchema = new Schema<ICar>({
  title: {
    type: String,
    required: [true, "Title is a required field"],
  },
  description: {
    type: String,
    required: [true, "Description is a required field"],
  },
  make: {
    type: String,
    required: [true, "Make is a required field"],
  },
  model: {
    type: String,
    required: [true, "Model is a required field"],
  },
  year: {
    type: Number,
    required: [true, "Year is a required field"],
  },
  mileage: {
    type: Number,
    required: [true, "Mileage is a required field"],
  },
  type: {
    type: String,
    required: [true, "Type is a required field"],
  },
  condition: {
    type: Number,
    required: [true, "Condition is a required field"],
    min: [1, "Condition cannot be less than 1"],
    max: [10, "Condition cannot be more than 10"],
  },
  vin: {
    type: String,
    required: [true, "VIN is a required field"],
  },
  zipCode: {
    type: String,
    required: [true, "Zip Code is a required field"],
  },
  fuelType: {
    type: String,
    required: [true, "Fuel Type is a required field"],
  },
  driverType: {
    type: String,
    required: [true, "Driver Type is a required field"],
  },
  transmission: {
    type: String,
    required: [true, "Transmission is a required field"],
  },
  cylinder: {
    type: Number,
    required: [true, "Cylinder is a required field"],
  },
  engineSize: {
    type: Number,
    required: [true, "Engine Size is a required field"],
  },
  registrationStatus: {
    type: Boolean,
    required: [true, "Registration Status is a required field"],
  },
  color: {
    type: String,
    required: [true, "Color is a required field"],
  },
  doors: {
    type: Number,
    required: [true, "Doors is a required field"],
  },
  price: {
    type: Number,
    required: [true, "Price is a required field"],
  },
  features: {
    type: [String],
    required: [true, "Features are required"],
  },
  imageUrls: {
    type: [String],
    required: [true, "Image URLs are required"],
  },
});

export const Car = model<ICar>("Car", carSchema);
