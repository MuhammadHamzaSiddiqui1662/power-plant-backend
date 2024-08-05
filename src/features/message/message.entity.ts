import { Schema, model, Document } from "mongoose";
import { MessageType } from "../../types/message";

export interface IMessage extends Document {
  chatId: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  type: MessageType;
  content?: string;
  seen: boolean;
  seenAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    seenAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Message = model<IMessage>("Message", messageSchema);
