"use client"
import { Nav } from "@/components/nav"
import { TrainerCard } from "@/components/trainer-card"
import { GymsNearby } from "@/components/gyms-nearby"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const trainers = [
  {
    id: "1",
    name: "Alex Johnson",
    photo: "/trainer-1.jpg",
    specialty: "Strength Training",
    clientsTrained: 247,
    rating: 4.9,
    reviews: 89,
    reviewsList: [
      { author: "Sarah M.", comment: "Alex helped me gain 15lbs of muscle in 6 months!", rating: 5 },
      { author: "Mike R.", comment: "Great form correction and motivation.", rating: 5 },
    ],
  },
  {
    id: "2",
    name: "Emma Davis",
    photo: "/trainer-2.jpg",
    specialty: "HIIT & Cardio",
    clientsTrained: 189,
    rating: 4.8,
    reviews: 67,
    reviewsList: [
      { author: "John P.", comment: "Lost 20lbs and feel amazing!", rating: 5 },
      { author: "Lisa K.", comment: "High energy sessions that keep me engaged.", rating: 4 },
    ],
  },
  {
    id: "3",
    name: "Marcus Chen",
    photo: "/trainer-3.jpg",
    specialty: "Olympic Weightlifting",
    clientsTrained: 156,
    rating: 4.7,
    reviews: 52,
    reviewsList: [
      { author: "Tom W.", comment: "Improved my snatch technique significantly.", rating: 5 },
      { author: "Anna L.", comment: "Patient and knowledgeable coach.", rating: 4 },
    ],
  },
  {
    id: "4",
    name: "Sophia Rodriguez",
    photo: "/trainer-4.jpg",
    specialty: "Yoga & Flexibility",
    clientsTrained: 203,
    rating: 4.9,
    reviews: 78,
    reviewsList: [
      { author: "David H.", comment: "Much more flexible and less stressed.", rating: 5 },
      { author: "Rachel T.", comment: "Perfect balance of strength and relaxation.", rating: 5 },
    ],
  },
  {
    id: "5",
    name: "James Wilson",
    photo: "/trainer-5.jpg",
    specialty: "Bodybuilding",
    clientsTrained: 312,
    rating: 4.6,
    reviews: 94,
    reviewsList: [
      { author: "Kevin B.", comment: "Helped me compete in my first show.", rating: 5 },
      { author: "Maria S.", comment: "Detailed nutrition and training plans.", rating: 4 },
    ],
  },
  {
    id: "6",
    name: "Olivia Thompson",
    photo: "/trainer-6.jpg",
    specialty: "CrossFit",
    clientsTrained: 178,
    rating: 4.8,
    reviews: 61,
    reviewsList: [
      { author: "Chris D.", comment: "Increased my WOD times dramatically.", rating: 5 },
      { author: "Nina F.", comment: "Fun and challenging workouts.", rating: 4 },
    ],
  },
]

export default function TrainersPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mt-2">
          <h1 className="text-2xl font-semibold mb-6">Trainers</h1>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="border-white/10 bg-background/60">
                <CardHeader>
                  <CardTitle>Featured Trainers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {trainers.map((trainer) => (
                      <TrainerCard key={trainer.id} trainer={trainer} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <GymsNearby />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
