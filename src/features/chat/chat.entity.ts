import { Schema, Types, model } from "mongoose";

const chatSchema = new Schema({
  innovator: {
    type: Types.ObjectId,
    ref: "User",
  },
  investor: {
    type: Types.ObjectId,
    ref: "User",
  },
  broker: {
    type: Types.ObjectId,
    ref: "User",
  },
  closed: {
    type: Boolean,
    default: false,
  },
});

export const Chat = model("Chat", chatSchema);
