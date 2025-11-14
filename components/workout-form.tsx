"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { FloatingLabelInput } from "./floating-label-input"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useWorkouts } from "@/hooks/use-workouts"
import { useToast } from "@/hooks/use-toast"

type Props = {
  onSuccess?: () => void
  compact?: boolean
}

export function WorkoutForm({ onSuccess, compact }: Props) {
  const [exercise, setExercise] = useState("")
  const [sets, setSets] = useState<string>("")
  const [reps, setReps] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [submitting, setSubmitting] = useState(false)
  const { add } = useWorkouts()
  const { toast } = useToast()

  const canSubmit = exercise.trim() && Number(sets) > 0 && Number(reps) > 0 && Number(weight) >= 0 && !!date

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    try {
      await add({
        date: (date || new Date()).toISOString(),
        exercise: exercise.trim(),
        sets: Number(sets),
        reps: Number(reps),
        weight: Number(weight),
      })

      // playful but subtle feedback
      if (typeof window !== "undefined") {
        const audio = new Audio("/click.mp3")
        audio.volume = 0.2
        audio.play().catch(() => {})
        if (navigator.vibrate) navigator.vibrate(10)
      }

      toast({ title: "Workout logged!", description: "Great consistency." })
      setExercise("")
      setSets("")
      setReps("")
      setWeight("")
      setDate(new Date())
      onSuccess?.()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2")}>
      <div className="md:col-span-2">
        <FloatingLabelInput id="exercise" label="Exercise Name" value={exercise} onChange={setExercise} required />
      </div>
      <FloatingLabelInput
        id="sets"
        label="Sets"
        type="number"
        inputMode="numeric"
        min={1}
        value={sets}
        onChange={setSets}
        required
      />
      <FloatingLabelInput
        id="reps"
        label="Reps"
        type="number"
        inputMode="numeric"
        min={1}
        value={reps}
        onChange={setReps}
        required
      />
      <FloatingLabelInput
        id="weight"
        label="Weight"
        type="number"
        inputMode="decimal"
        min={0}
        step={0.5}
        value={weight}
        onChange={setWeight}
        required
        suffix={<span>kg</span>}
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm text-foreground/60">Date</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className={cn(
                "h-12 justify-start rounded-xl border-white/10 bg-background/60 text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="md:col-span-2">
        <Button
          type="submit"
          disabled={!canSubmit || submitting}
          className={cn(
            "group relative mt-2 h-12 w-full rounded-xl bg-emerald-500 text-white transition",
            "hover:bg-emerald-500/95",
          )}
        >
          <span className="relative z-10">Log Workout</span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-emerald-300/30 [box-shadow:0_0_28px_6px_rgba(16,185,129,0.35)_inset,0_0_22px_2px_rgba(16,185,129,0.35)] transition-opacity group-hover:opacity-100 opacity-90"
          />
        </Button>
      </div>
    </form>
  )
}
