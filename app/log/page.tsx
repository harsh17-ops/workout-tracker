"use client"
import { Nav } from "@/components/nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WorkoutForm } from "@/components/workout-form"

export default function LogPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="mx-auto mt-4 max-w-2xl">
          <Card className="relative overflow-hidden border-white/10 bg-background/60 backdrop-blur">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-70"
              style={{
                background: "linear-gradient(120deg, rgba(16,185,129,0.35), rgba(245,158,11,0.25))",
                filter: "blur(18px)",
              }}
            />
            <CardHeader>
              <CardTitle className="relative z-10">Log Workout</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <WorkoutForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
