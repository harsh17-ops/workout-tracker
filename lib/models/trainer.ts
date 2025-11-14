import mongoose, { Schema, Document } from "mongoose"

export interface ITrainer extends Document {
  _id: string
  name: string
  experience: number // years
  specialization: string
  clientsTrained: number
  rating: number
  reviews: number
  photo?: string
  createdAt: Date
}

const TrainerSchema: Schema = new Schema({
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  specialization: { type: String, required: true },
  clientsTrained: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Trainer || mongoose.model<ITrainer>("Trainer", TrainerSchema)
