"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Home, NotebookPen, LineChart, Target, User2, Dumbbell, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ModeToggle } from "./mode-toggle"
import { WorkoutForm } from "./workout-form"

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/log", label: "Log Workout", icon: NotebookPen },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/trainers", label: "Trainers", icon: Dumbbell },
  { href: "/profile", label: "Profile", icon: User2 },
]

export function Nav({ brand = "ElevateFit" }: { brand?: string }) {
  const pathname = usePathname()
  const [openQuick, setOpenQuick] = useState(false)

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex items-center gap-1 md:gap-2">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={cn(
              "group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
              "hover:bg-foreground/5 hover:text-foreground",
              active ? "text-foreground bg-foreground/10" : "text-foreground/70",
            )}
          >
            <Icon className={cn("h-4 w-4 transition", active ? "opacity-100" : "opacity-80 group-hover:opacity-100")} />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-6xl px-4">
          <div
            className={cn(
              "mt-3 flex items-center justify-between rounded-2xl border",
              "border-white/10 bg-white/10 p-2 backdrop-blur supports-[backdrop-filter]:bg-white/10",
              "dark:border-white/10 dark:bg-black/30",
            )}
            style={{
              boxShadow: "0 2px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-emerald-400" />
              <Link href="/" className="text-sm font-medium tracking-wide text-foreground/90">
                {brand}
              </Link>
            </div>

            <div className="hidden md:block">
              <NavLinks />
            </div>

            <div className="flex items-center gap-2">
              <Dialog open={openQuick} onOpenChange={setOpenQuick}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className={cn(
                      "relative overflow-hidden",
                      "bg-emerald-500 text-white",
                      "hover:bg-emerald-500/90",
                      "transition",
                    )}
                  >
                    <span className="relative z-10">Quick Log</span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-emerald-300/30 [box-shadow:0_0_24px_4px_rgba(16,185,129,0.35)_inset,0_0_18px_2px_rgba(16,185,129,0.35)]"
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Quick Log</DialogTitle>
                  </DialogHeader>
                  <WorkoutForm onSuccess={() => setOpenQuick(false)} compact />
                </DialogContent>
              </Dialog>
              <ModeToggle />
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open menu">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72">
                    <div className="mt-6 flex flex-col gap-2">
                      <NavLinks />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Spacer for fixed nav */}
      <div aria-hidden className="h-20 md:h-[92px]" />
    </>
  )
}
