"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Nav } from "@/components/nav"
import { Testimonials } from "@/components/testimonials"

export default function HomePage() {
  return (
    <main>
      <Nav brand="ElevateFit" />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Background image placeholder */}
          <Image
            src="/gym-background-photo-dark-premium.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-pretty text-4xl font-semibold leading-tight text-foreground md:text-6xl">
              Track with intention. Perform with elegance.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-foreground/70">
              A luxury workout tracker designed for focus and consistency. Glass-smooth UI, effortless logging, and
              insights that move you forward.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Button asChild className="h-12 rounded-xl bg-emerald-500 px-6 text-white hover:bg-emerald-500/90">
                <Link href="/log">Start Logging Workouts</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-white/10 backdrop-blur bg-transparent"
              >
                <Link href="/progress">View Progress</Link>
              </Button>
            </div>
          </div>
          <div className="mt-16">
            <Testimonials />
          </div>
        </div>
      </section>
    </main>
  )
}
