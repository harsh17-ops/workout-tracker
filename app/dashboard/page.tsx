"use client"
import { useEffect, useState } from "react"
import { Nav } from "@/components/nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Donut } from "recharts"
import { useRouter } from "next/navigation"

type WorkoutLog = {
  _id: string
  exercise: string
  sets: number
  reps: number
  duration: number
  caloriesBurned: number
  date: string
}

type Goal = {
  _id: string
  title: string
  target: number
  progress: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function DashboardPage() {
  const [workouts, setWorkouts] = useState<WorkoutLog[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  async function loadData() {
    setLoading(true)
    const [workoutsRes, goalsRes] = await Promise.all([
      fetch("/api/workouts", { cache: "no-store" }),
      fetch("/api/goals", { cache: "no-store" })
    ])

    if (workoutsRes.status === 401 || goalsRes.status === 401) {
      router.push("/signin")
      return
    }

    const workoutsData = await workoutsRes.json()
    const goalsData = await goalsRes.json()

    setWorkouts(workoutsData.workouts || [])
    setGoals(goalsData.goals || [])
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Prepare data for charts
  const weeklyProgress = workouts.reduce((acc, workout) => {
    const week = new Date(workout.date).toISOString().slice(0, 10)
    acc[week] = (acc[week] || 0) + workout.caloriesBurned
    return acc
  }, {} as Record<string, number>)

  const weeklyData = Object.entries(weeklyProgress).map(([date, calories]) => ({
    date,
    calories
  }))

  const workoutTypes = workouts.reduce((acc, workout) => {
    acc[workout.exercise] = (acc[workout.exercise] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(workoutTypes).map(([name, value]) => ({
    name,
    value
  }))

  const monthlyCalories = workouts.reduce((acc, workout) => {
    const month = new Date(workout.date).toISOString().slice(0, 7)
    acc[month] = (acc[month] || 0) + workout.caloriesBurned
    return acc
  }, {} as Record<string, number>)

  const barData = Object.entries(monthlyCalories).map(([month, calories]) => ({
    month,
    calories
  }))

  const achievedGoals = goals.filter(g => g.progress >= 100).length
  const pendingGoals = goals.length - achievedGoals
  const donutData = [
    { name: 'Achieved', value: achievedGoals },
    { name: 'Pending', value: pendingGoals }
  ]

  if (loading) {
    return (
      <main>
        <Nav />
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mt-2 text-center">Loading dashboard...</div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mt-2">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Weekly Progress Line Chart */}
            <Card className="border-white/10 bg-background/60 lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calories" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Workout Type Distribution Pie Chart */}
            <Card className="border-white/10 bg-background/60">
              <CardHeader>
                <CardTitle>Workout Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Calorie Burn Bar Chart */}
            <Card className="border-white/10 bg-background/60 lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Calorie Burn</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calories" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Goals Donut Chart */}
            <Card className="border-white/10 bg-background/60">
              <CardHeader>
                <CardTitle>Goals Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      <Cell fill="#00C49F" />
                      <Cell fill="#FF8042" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
