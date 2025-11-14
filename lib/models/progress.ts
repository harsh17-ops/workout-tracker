import mongoose, { Schema, Document } from "mongoose"

export interface IProgress extends Document {
  _id: string
  userId: string
  type: "weekly" | "monthly" | "all-time"
  period: string // e.g., "2023-W01" for weekly, "2023-01" for monthly
  totalWorkouts: number
  totalCalories: number
  averageCaloriesPerWorkout: number
  progressIncrease: number // percentage increase from previous period
  createdAt: Date
}

const ProgressSchema: Schema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true, enum: ["weekly", "monthly", "all-time"] },
  period: { type: String, required: true },
  totalWorkouts: { type: Number, default: 0 },
  totalCalories: { type: Number, default: 0 },
  averageCaloriesPerWorkout: { type: Number, default: 0 },
  progressIncrease: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Progress || mongoose.model<IProgress>("Progress", ProgressSchema)
