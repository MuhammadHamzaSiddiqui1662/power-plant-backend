import { Schema, Types, model } from "mongoose";

const hiringSchema = new Schema({
  investor: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  broker: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  ip: {
    type: Types.ObjectId,
    ref: "IP",
    required: true,
  },
});

export const Hiring = model("Hiring", hiringSchema);
