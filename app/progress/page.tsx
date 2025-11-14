"use client"
import { Nav } from "@/components/nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMemo } from "react"
import { useWorkouts } from "@/hooks/use-workouts"
import { format } from "date-fns"

const COLORS = ["#34d399", "#10b981", "#f59e0b", "#a3a3a3", "#22d3ee"]

export default function ProgressPage() {
  const { workouts } = useWorkouts()

  const weekly = useMemo(() => {
    // group by week label
    const map = new Map<string, number>()
    for (const w of workouts) {
      const d = new Date(w.date)
      const weekLabel = `${d.getFullYear()}-W${Math.ceil((d.getDate() - d.getDay() + 1) / 7)}`
      const total = w.sets * w.reps * w.weight || 0
      map.set(weekLabel, (map.get(weekLabel) || 0) + total)
    }
    return Array.from(map.entries())
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([name, value]) => ({ name, value }))
  }, [workouts])

  const monthly = useMemo(() => {
    const map = new Map<string, number>()
    for (const w of workouts) {
      const d = new Date(w.date)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      const total = w.sets * w.reps * w.weight || 0
      map.set(key, (map.get(key) || 0) + total)
    }
    return Array.from(map.entries())
      .sort((a, b) => (a[0] > b[0] ? 1 : -1))
      .map(([name, value]) => ({ name, value }))
  }, [workouts])

  const exerciseDist = useMemo(() => {
    const map = new Map<string, number>()
    for (const w of workouts) {
      map.set(w.exercise, (map.get(w.exercise) || 0) + 1)
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }))
  }, [workouts])

  const recent = workouts.slice(0, 10)

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mt-2">
          <Tabs defaultValue="week" className="w-full">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl font-semibold">Progress</h1>
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="all">All-time</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="week" className="mt-6">
              <Card className="border-white/10 bg-background/60">
                <CardHeader>
                  <CardTitle>Weekly Total Weight Lifted</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RLineChart data={weekly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                    </RLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="month" className="mt-6">
              <Card className="border-white/10 bg-background/60">
                <CardHeader>
                  <CardTitle>Monthly Volume</CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-white/10 bg-background/60">
                  <CardHeader>
                    <CardTitle>Exercise Frequency</CardTitle>
                  </CardHeader>
                  <CardContent className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={exerciseDist}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={100}
                          innerRadius={60}
                          paddingAngle={3}
                        >
                          {exerciseDist.map((_, idx) => (
                            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-background/60">
                  <CardHeader>
                    <CardTitle>Recent Workouts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Exercise</TableHead>
                            <TableHead className="text-right">Sets</TableHead>
                            <TableHead className="text-right">Reps</TableHead>
                            <TableHead className="text-right">Weight</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recent.map((w) => (
                            <TableRow key={w.id}>
                              <TableCell>{format(new Date(w.date), "PP")}</TableCell>
                              <TableCell>{w.exercise}</TableCell>
                              <TableCell className="text-right">{w.sets}</TableCell>
                              <TableCell className="text-right">{w.reps}</TableCell>
                              <TableCell className="text-right">{w.weight} kg</TableCell>
                            </TableRow>
                          ))}
                          {recent.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center text-sm text-foreground/60">
                                No workouts yet. Log your first workout to see progress.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
