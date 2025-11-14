import { NextResponse } from "next/server"
import { createSession, findUserByEmail, verifyPassword } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
    const user = await findUserByEmail(email)
    if (!user) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    const ok = await verifyPassword(password, user.passwordHash)
    if (!ok) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    await createSession({ _id: String(user._id), email: user.email, name: user.name })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unable to sign in" }, { status: 400 })
  }
}
