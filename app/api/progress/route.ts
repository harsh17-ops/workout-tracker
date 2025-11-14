import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import Progress from "@/lib/models/progress"
import WorkoutLog from "@/lib/models/workoutLog"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  await connectToDatabase()
  const progress = await Progress.find({ userId: user.id }).sort({ createdAt: -1 })
  return NextResponse.json({ progress })
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { type, period } = await req.json()
  if (!type || !period) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  await connectToDatabase()

  // Calculate progress based on workout logs
  const workouts = await WorkoutLog.find({ userId: user.id })
  const totalWorkouts = workouts.length
  const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0)
  const averageCaloriesPerWorkout = totalWorkouts > 0 ? totalCalories / totalWorkouts : 0

  // Simple progress increase calculation (placeholder)
  const progressIncrease = 0 // Would need previous period data

  const progress = new Progress({
    userId: user.id,
    type,
    period,
    totalWorkouts,
    totalCalories,
    averageCaloriesPerWorkout,
    progressIncrease,
  })
  const savedProgress = await progress.save()
  return NextResponse.json({ id: savedProgress._id.toString() })
}
