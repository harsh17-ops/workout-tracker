import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import Goal from "@/lib/models/goal"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  await connectToDatabase()
  const goals = await Goal.find({ userId: user.id }).sort({ createdAt: -1 })
  return NextResponse.json({ goals })
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { title, target, unit } = await req.json()
  if (!title || !target) return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  await connectToDatabase()
  const goal = new Goal({
    userId: user.id,
    title,
    target,
    unit: unit || "workouts",
    progress: 0,
  })
  const savedGoal = await goal.save()
  return NextResponse.json({ id: savedGoal._id.toString() })
}
