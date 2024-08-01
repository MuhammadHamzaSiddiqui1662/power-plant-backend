import { Schema, model, Document, Types } from "mongoose";
import { IpStatus } from "../../types/ip";

interface ISection {
  title: string;
  content: string;
}

const sectionSchema = new Schema<ISection>({
  title: {
    type: String,
    required: [true, "Title is a required field"],
  },
  content: {
    type: String,
    required: [true, "Content is a required field"],
  },
});

interface IIP extends Document {
  name: string;
  description: string;
  abstract: string;
  price: number;
  status: IpStatus;
  category: string;
  publishedDate: Date;
  patentNumber: string;
  trademark: string;
  copyright: string;
  mainImg: string;
  images: string[];
  sections: ISection[];
  userId: Types.ObjectId;
}

const ipSchema = new Schema<IIP>({
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  description: {
    type: String,
    required: [true, "Description is a required field"],
  },
  abstract: {
    type: String,
    required: [true, "Abstract is a required field"],
  },
  price: {
    type: Number,
    required: [true, "Price is a required field"],
  },
  status: {
    type: String,
    required: [true, "Status is a required field"],
  },
  category: {
    type: String,
    required: [true, "Category is a required feild"],
  },
  publishedDate: {
    type: Date,
  },
  patentNumber: {
    type: String,
  },
  trademark: {
    type: String,
  },
  copyright: {
    type: String,
  },
  mainImg: {
    type: String,
    required: [true, "Main Image is a required field"],
  },
  images: {
    type: [String],
  },
  sections: {
    type: [sectionSchema],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is a required field"],
  },
});

export const IP = model<IIP>("IP", ipSchema);
