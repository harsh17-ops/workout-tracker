import mongoose, { Schema, Document } from "mongoose"

export interface IGoal extends Document {
  _id: string
  userId: string
  title: string
  target: number
  unit: string
  progress: number
  createdAt: Date
}

const GoalSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  target: { type: Number, required: true },
  unit: { type: String, default: "workouts" },
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Goal || mongoose.model<IGoal>("Goal", GoalSchema)
