import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star } from "lucide-react"

type Gym = {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  hours: string
}

const gyms: Gym[] = [
  {
    id: "1",
    name: "Elite Fitness Center",
    address: "123 Main St, Downtown",
    distance: "0.5 km",
    rating: 4.8,
    hours: "6 AM - 10 PM",
  },
  {
    id: "2",
    name: "PowerHouse Gym",
    address: "456 Oak Ave, Midtown",
    distance: "1.2 km",
    rating: 4.6,
    hours: "5 AM - 11 PM",
  },
  {
    id: "3",
    name: "FitZone 24/7",
    address: "789 Pine Rd, Uptown",
    distance: "2.1 km",
    rating: 4.9,
    hours: "24/7",
  },
  {
    id: "4",
    name: "Strength & Conditioning Hub",
    address: "321 Elm St, Riverside",
    distance: "3.0 km",
    rating: 4.7,
    hours: "7 AM - 9 PM",
  },
]

export function GymsNearby() {
  return (
    <Card className="border-white/10 bg-background/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Gyms Nearby
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {gyms.map((gym) => (
          <div key={gym.id} className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-background/40">
            <div className="flex-1">
              <h4 className="font-medium">{gym.name}</h4>
              <p className="text-sm text-foreground/60">{gym.address}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-foreground/50">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {gym.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  {gym.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {gym.hours}
                </span>
              </div>
            </div>
            <Badge variant="outline" className="ml-4">
              View
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
