import { Schema, model, Document, Types } from "mongoose";

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
  price: number;
  status: string;
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
    required: [true, "Published Date is a required field"],
  },
  patentNumber: {
    type: String,
    required: [true, "Patent Number is a required field"],
  },
  trademark: {
    type: String,
    required: [true, "Trademark is a required field"],
  },
  copyright: {
    type: String,
    required: [true, "Copyright is a required field"],
  },
  mainImg: {
    type: String,
    required: [true, "Main Image is a required field"],
  },
  images: {
    type: [String],
    required: [true, "Images are required"],
  },
  sections: {
    type: [sectionSchema],
    required: [true, "Sections are required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is a required field"],
  },
});

export const IP = model<IIP>("IP", ipSchema);
