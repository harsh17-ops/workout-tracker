import mongoose, { Schema, Document } from "mongoose"

export interface IWorkoutLog extends Document {
  _id: string
  userId: string
  exercise: string
  sets: number
  reps: number
  duration: number // in minutes
  caloriesBurned: number
  date: Date
  createdAt: Date
}

const WorkoutLogSchema: Schema = new Schema({
  userId: { type: String, required: true },
  exercise: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.WorkoutLog || mongoose.model<IWorkoutLog>("WorkoutLog", WorkoutLogSchema)
