import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "./mongodb"
import User from "./models/user"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-me")
const SESSION_COOKIE = "elevatefit_session"
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type UserDoc = {
  _id: string
  email: string
  name?: string
  passwordHash: string
  profilePic?: string // base64 data URL
  age?: number
  height?: number
  weight?: number
  weeklyFocus?: string[]
  createdAt: Date
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function findUserByEmail(email: string) {
  await connectToDatabase()
  return User.findOne({ email })
}

export async function createUser(email: string, password: string, name?: string) {
  await connectToDatabase()
  const existing = await User.findOne({ email })
  if (existing) throw new Error("Email already in use")

  const passwordHash = await hashPassword(password)
  const user = new User({
    email,
    name: name || email.split("@")[0],
    passwordHash,
    createdAt: new Date(),
  })
  const savedUser = await user.save()
  return savedUser._id.toString()
}

export async function createSession(user: { _id: string; email: string; name?: string }) {
  const token = await new SignJWT({ sub: user._id, email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return {
      id: String(payload.sub),
      email: String(payload.email),
      name: payload.name ? String(payload.name) : undefined,
    }
  } catch {
    return null
  }
}
