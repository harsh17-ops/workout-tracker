"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

const items = [
  { quote: "Aurea Fit keeps me accountable every day.", author: "Olivia, Product Lead" },
  { quote: "Beautiful UI and effortless logging.", author: "Marcus, Coach" },
  { quote: "I hit PRs thanks to consistent tracking.", author: "Elena, Athlete" },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <Card className="mx-auto w-full max-w-3xl border-white/10 bg-background/60 p-6 text-center">
      <div className="text-balance text-lg text-foreground/90 transition">“{items[index].quote}”</div>
      <div className="mt-2 text-sm text-foreground/60">— {items[index].author}</div>
      <div className="mt-4 text-xs text-foreground/50">1,200 workouts logged</div>
    </Card>
  )
}
