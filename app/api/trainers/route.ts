import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Trainer from "@/lib/models/trainer"

export async function GET() {
  await connectToDatabase()
  const trainers = await Trainer.find().sort({ rating: -1 })
  return NextResponse.json({ trainers })
}

export async function POST(req: Request) {
  const { name, experience, specialization, clientsTrained, rating, reviews, photo } = await req.json()
  if (!name || !experience || !specialization) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  await connectToDatabase()
  const trainer = new Trainer({
    name,
    experience,
    specialization,
    clientsTrained: clientsTrained || 0,
    rating: rating || 0,
    reviews: reviews || 0,
    photo,
  })
  const savedTrainer = await trainer.save()
  return NextResponse.json({ id: savedTrainer._id.toString() })
}
