"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Nav } from "@/components/nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type User = {
  _id: string
  email: string
  name?: string
  profilePic?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function loadProfile() {
    setError(null)
    const res = await fetch("/api/user/profile", { cache: "no-store" })
    if (res.status === 401) {
      router.push("/signin")
      return
    }
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Failed to load profile")
      return
    }
    setUser(data.user)
    setLoading(false)
  }

  useEffect(() => {
    loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function signOut() {
    await fetch("/api/auth/signout", { method: "POST" })
    router.push("/signin")
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const dataUrl = await fileToDataURLResized(f, 256)
    await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profilePic: dataUrl }),
    })
    await loadProfile()
  }

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mt-2 grid gap-6 md:grid-cols-3">
          <Card className="border-white/10 bg-background/60 md:col-span-1">
            <CardContent className="flex flex-col items-center gap-3 p-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.profilePic || "/user-avatar-photo.jpg"} alt="User avatar" />
                <AvatarFallback>{user?.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <div className="text-lg font-medium">{user?.name || user?.email || "Profile"}</div>
                <div className="mt-1">
                  <Badge className="bg-emerald-500/20 text-emerald-400">Member</Badge>
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Change profile photo"
              />
              <Button variant="outline" className="mt-2 w-full bg-transparent" onClick={() => fileRef.current?.click()}>
                Change Photo
              </Button>
              <Button variant="destructive" className="mt-1 w-full" onClick={signOut}>
                Sign Out
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:col-span-2">
            <Card className="border-white/10 bg-background/60">
              <CardHeader>
                <CardTitle>Personal Info</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" placeholder="180" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" placeholder="78" />
                </div>
                <div className="sm:col-span-3">
                  <Button className="w-full sm:w-auto">Save</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-background/60">
              <CardHeader>
                <CardTitle>Weekly Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-foreground/60">Preferred exercises</div>
                <ToggleGroup type="multiple" className="flex flex-wrap gap-2">
                  {["Squat", "Deadlift", "Bench", "Press", "Pull-up", "Run"].map((x) => (
                    <ToggleGroupItem
                      key={x}
                      value={x.toLowerCase()}
                      className="rounded-full border-white/10 data-[state=on]:bg-emerald-500/20 data-[state=on]:text-emerald-400"
                    >
                      {x}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <Button className="mt-2">Update Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        {loading && <p className="mt-6 text-sm text-foreground/60">Loading profile…</p>}
        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      </section>
    </main>
  )
}

function fileToDataURLResized(file: File, maxDim: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const scale = Math.min(maxDim / img.width, maxDim / img.height, 1)
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement("canvas")
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject(new Error("Canvas not supported"))
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL("image/jpeg", 0.85))
      }
      img.src = String(reader.result)
    }
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(file)
  })
}
