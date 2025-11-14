import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import WorkoutLog from "@/lib/models/workoutLog"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  await connectToDatabase()
  const workouts = await WorkoutLog.find({ userId: user.id }).sort({ date: -1 })
  return NextResponse.json({ workouts })
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { exercise, sets, reps, duration, caloriesBurned, date } = await req.json()
  if (!exercise || !sets || !reps || !duration || !caloriesBurned || !date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  await connectToDatabase()
  const workout = new WorkoutLog({
    userId: user.id,
    exercise,
    sets,
    reps,
    duration,
    caloriesBurned,
    date: new Date(date),
  })
  const savedWorkout = await workout.save()
  return NextResponse.json({ id: savedWorkout._id.toString() })
}
