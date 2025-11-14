import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  _id: string
  email: string
  name?: string
  passwordHash: string
  profilePic?: string
  age?: number
  height?: number // in cm
  weight?: number // in kg
  weeklyFocus?: string[] // array of exercise names
  createdAt: Date
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  passwordHash: { type: String, required: true },
  profilePic: { type: String },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  weeklyFocus: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
