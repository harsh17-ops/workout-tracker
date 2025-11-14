import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, MessageSquare } from "lucide-react"

type Trainer = {
  id: string
  name: string
  photo: string
  specialty: string
  clientsTrained: number
  rating: number
  reviews: number
  reviewsList: { author: string; comment: string; rating: number }[]
}

type Props = {
  trainer: Trainer
}

export function TrainerCard({ trainer }: Props) {
  return (
    <Card className="border-white/10 bg-background/60 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <Image
            src={trainer.photo}
            alt={trainer.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div>
            <CardTitle className="text-lg">{trainer.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {trainer.specialty}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Users className="h-4 w-4 mx-auto mb-1 text-emerald-400" />
            <div className="text-sm font-medium">{trainer.clientsTrained}</div>
            <div className="text-xs text-foreground/60">Clients</div>
          </div>
          <div>
            <Star className="h-4 w-4 mx-auto mb-1 text-yellow-400" />
            <div className="text-sm font-medium">{trainer.rating}</div>
            <div className="text-xs text-foreground/60">Rating</div>
          </div>
          <div>
            <MessageSquare className="h-4 w-4 mx-auto mb-1 text-blue-400" />
            <div className="text-sm font-medium">{trainer.reviews}</div>
            <div className="text-xs text-foreground/60">Reviews</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Reviews</h4>
          {trainer.reviewsList.slice(0, 2).map((review, idx) => (
            <div key={idx} className="text-xs text-foreground/70">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-medium">{review.author}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-foreground/60">{review.comment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
