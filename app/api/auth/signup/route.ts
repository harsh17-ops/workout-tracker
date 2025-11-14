import { NextResponse } from "next/server"
import { createSession, createUser } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }
    const id = await createUser(email, password, name)
    await createSession({ _id: id, email, name })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unable to sign up" }, { status: 400 })
  }
}
