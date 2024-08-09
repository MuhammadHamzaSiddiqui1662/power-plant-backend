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
  open: {
    type: Boolean,
    default: false,
  },
  unReadMessages: {
    type: Number,
    default: 0,
  },
  lastMessage: {
    type: Types.ObjectId,
    ref: "Message",
  },
});

export const Chat = model("Chat", chatSchema);
