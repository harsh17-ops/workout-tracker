import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/lib/models/user"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  await connectToDatabase()
  const doc = await User.findById(user.id).select("-passwordHash")
  return NextResponse.json({ user: doc })
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { name, profilePic, age, height, weight, weeklyFocus } = await req.json()
  await connectToDatabase()
  await User.findByIdAndUpdate(user.id, {
    $set: {
      ...(name !== undefined ? { name } : {}),
      ...(profilePic !== undefined ? { profilePic } : {}),
      ...(age !== undefined ? { age } : {}),
      ...(height !== undefined ? { height } : {}),
      ...(weight !== undefined ? { weight } : {}),
      ...(weeklyFocus !== undefined ? { weeklyFocus } : {}),
    },
  })
  return NextResponse.json({ ok: true })
}
