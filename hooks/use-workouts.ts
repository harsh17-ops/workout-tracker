"use client"
import useSWR from "swr"
import { v4 as uuid } from "uuid"

export type Workout = {
  id: string
  date: string // ISO
  exercise: string
  sets: number
  reps: number
  weight: number // kg
}

const KEY = "aurea.workouts"

const getStore = (): Workout[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Workout[]) : []
  } catch {
    return []
  }
}

const setStore = (w: Workout[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify(w))
}

export function useWorkouts() {
  const { data, mutate } = useSWR<Workout[]>(KEY, async () => getStore(), {
    fallbackData: [],
  })

  const add = async (w: Omit<Workout, "id">) => {
    const next = [{ ...w, id: uuid() }, ...(data || [])]
    setStore(next)
    await mutate(next, { revalidate: false })
  }

  const remove = async (id: string) => {
    const next = (data || []).filter((w) => w.id !== id)
    setStore(next)
    await mutate(next, { revalidate: false })
  }

  return {
    workouts: data || [],
    add,
    remove,
  }
}
