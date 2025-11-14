import { connectToDatabase } from "./mongodb"
import Trainer from "./models/trainer"
import Gym from "./models/gym"
import User from "./models/user"
import Goal from "./models/goal"
import WorkoutLog from "./models/workoutLog"

export async function seedData() {
  await connectToDatabase()

  // Seed trainers
  const trainers = [
    {
      name: "Alex Johnson",
      experience: 5,
      specialization: "Strength Training",
      clientsTrained: 247,
      rating: 4.9,
      reviews: 89,
      photo: "/trainer-1.jpg",
    },
    {
      name: "Emma Davis",
      experience: 4,
      specialization: "HIIT & Cardio",
      clientsTrained: 189,
      rating: 4.8,
      reviews: 67,
      photo: "/trainer-2.jpg",
    },
    {
      name: "Marcus Chen",
      experience: 6,
      specialization: "Olympic Weightlifting",
      clientsTrained: 156,
      rating: 4.7,
      reviews: 52,
      photo: "/trainer-3.jpg",
    },
    {
      name: "Sophia Rodriguez",
      experience: 3,
      specialization: "Yoga & Flexibility",
      clientsTrained: 203,
      rating: 4.9,
      reviews: 78,
      photo: "/trainer-4.jpg",
    },
    {
      name: "James Wilson",
      experience: 7,
      specialization: "Bodybuilding",
      clientsTrained: 312,
      rating: 4.6,
      reviews: 94,
      photo: "/trainer-5.jpg",
    },
    {
      name: "Olivia Thompson",
      experience: 4,
      specialization: "CrossFit",
      clientsTrained: 178,
      rating: 4.8,
      reviews: 61,
      photo: "/trainer-6.jpg",
    },
  ]

  for (const trainerData of trainers) {
    await Trainer.findOneAndUpdate(
      { name: trainerData.name },
      trainerData,
      { upsert: true, new: true }
    )
  }

  // Seed gyms
  const gyms = [
    {
      name: "Elite Fitness Center",
      location: "123 Main St, Downtown",
      rating: 4.8,
      hours: "6 AM - 10 PM",
      distance: "0.5 km",
    },
    {
      name: "PowerHouse Gym",
      location: "456 Oak Ave, Midtown",
      rating: 4.6,
      hours: "5 AM - 11 PM",
      distance: "1.2 km",
    },
    {
      name: "FitZone 24/7",
      location: "789 Pine Rd, Uptown",
      rating: 4.9,
      hours: "24/7",
      distance: "2.1 km",
    },
    {
      name: "Strength & Conditioning Hub",
      location: "321 Elm St, Riverside",
      rating: 4.7,
      hours: "7 AM - 9 PM",
      distance: "3.0 km",
    },
  ]

  for (const gymData of gyms) {
    await Gym.findOneAndUpdate(
      { name: gymData.name },
      gymData,
      { upsert: true, new: true }
    )
  }

  console.log("Sample data seeded successfully")
}
