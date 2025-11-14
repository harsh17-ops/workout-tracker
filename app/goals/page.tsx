"use client"
import { useEffect, useMemo, useState } from "react"
import { Nav } from "@/components/nav"
import { GoalCard } from "@/components/goal-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

type Goal = {
  _id: string
  title: string
  target: number
  unit: string
  progress: number
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [target, setTarget] = useState<number | "">("")
  const [unit, setUnit] = useState("workouts")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function loadGoals() {
    setLoading(true)
    setError(null)
    const res = await fetch("/api/goals", { cache: "no-store" })
    if (res.status === 401) {
      router.push("/signin")
      return
    }
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Failed to load goals")
      setLoading(false)
      return
    }
    setGoals(data.goals || [])
    setLoading(false)
  }

  useEffect(() => {
    loadGoals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function addGoal() {
    setError(null)
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, target: Number(target), unit }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || "Unable to create goal")
      return
    }
    setOpen(false)
    setTitle("")
    setTarget("")
    setUnit("workouts")
    await loadGoals()
  }

  async function deleteGoal(id?: string) {
    if (!id) return
    await fetch(`/api/goals/${id}`, { method: "DELETE" })
    await loadGoals()
  }

  const formatted = useMemo(
    () =>
      goals.map((g) => ({
        id: g._id,
        title: g.title,
        progress: Math.max(0, Math.min(100, g.progress ?? 0)),
        targetLabel: `${g.target} ${g.unit}`,
      })),
    [goals],
  )

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Goals</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full text-sm text-foreground/60">Loading goals…</div>
          ) : formatted.length === 0 ? (
            <div className="col-span-full text-sm text-foreground/60">No goals yet. Create your first goal.</div>
          ) : (
            formatted.map((g) => (
              <GoalCard
                key={g.id}
                id={g.id}
                title={g.title}
                target={g.targetLabel}
                progress={g.progress}
                onDelete={deleteGoal}
              />
            ))
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Goal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bench 100kg" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="target">Target</Label>
                  <Input
                    id="target"
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="kg" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addGoal} disabled={!title || target === ""}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  )
}
