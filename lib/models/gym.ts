import mongoose, { Schema, Document } from "mongoose"

export interface IGym extends Document {
  _id: string
  name: string
  location: string // address
  rating: number
  hours: string
  distance?: string // from user location, can be calculated
  createdAt: Date
}

const GymSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  hours: { type: String, default: "24/7" },
  distance: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Gym || mongoose.model<IGym>("Gym", GymSchema)
