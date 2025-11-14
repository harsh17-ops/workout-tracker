import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Gym from "@/lib/models/gym"

export async function GET() {
  await connectToDatabase()
  const gyms = await Gym.find().sort({ rating: -1 })
  return NextResponse.json({ gyms })
}

export async function POST(req: Request) {
  const { name, location, rating, hours, distance } = await req.json()
  if (!name || !location) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  await connectToDatabase()
  const gym = new Gym({
    name,
    location,
    rating: rating || 0,
    hours: hours || "24/7",
    distance,
  })
  const savedGym = await gym.save()
  return NextResponse.json({ id: savedGym._id.toString() })
}
