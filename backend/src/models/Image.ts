import { model, Model, Document, Schema } from "mongoose";
export interface IImage extends Document {
  label: string;
  url: string;
  width: number;
  height: number;
  createdAt: Date;
}

const imageScheema: Schema = new Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Image: Model<IImage> = model("Image", imageScheema);

export default Image;
