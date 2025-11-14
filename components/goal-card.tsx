"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Edit2, Trash2 } from "lucide-react"

type Props = {
  id?: string
  title: string
  target: string
  progress: number // 0..100
  eta?: string
  onDelete?: (id?: string) => void
  onEdit?: (id?: string) => void
}

export function GoalCard({ id, title, target, progress, eta, onDelete, onEdit }: Props) {
  return (
    <Card className="overflow-hidden border-white/10 bg-background/60 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-foreground/60">Target: {target}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="border-white/10 bg-transparent" onClick={() => onEdit?.(id)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="destructive" onClick={() => onDelete?.(id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative">
          <Progress value={progress} className="h-3 bg-white/10">
            {/* If custom slot supported; fallback to styling bg via class */}
          </Progress>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full [mask-image:linear-gradient(to_right,black,transparent_94%)]"
          >
            <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-400 opacity-60" />
          </div>
        </div>
        <div className="text-sm text-foreground/60">
          {progress}% complete {eta ? `• ETA ${eta}` : ""}
        </div>
      </CardContent>
    </Card>
  )
}
