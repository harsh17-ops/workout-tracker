import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const db = await getDb()
  const { progress, title, target, unit } = await _req.json()
  await db.collection("goals").updateOne(
    { _id: new ObjectId(params.id), userId: user.id },
    {
      $set: {
        ...(progress !== undefined ? { progress } : {}),
        ...(title ? { title } : {}),
        ...(target ? { target } : {}),
        ...(unit ? { unit } : {}),
      },
    },
  )
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const db = await getDb()
  await db.collection("goals").deleteOne({ _id: new ObjectId(params.id), userId: user.id })
  return NextResponse.json({ ok: true })
}
