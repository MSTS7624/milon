"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Heart, Briefcase, Clock } from "lucide-react"

interface JobCardProps {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  posted: string
  description: string
  saved?: boolean
  onSave?: (id: number) => void
}

export function JobCard({
  id,
  title,
  company,
  location,
  salary,
  type,
  posted,
  description,
  saved = false,
  onSave,
}: JobCardProps) {
  const [isSaved, setIsSaved] = useState(saved)

  const handleSave = () => {
    setIsSaved(!isSaved)
    onSave?.(id)
  }

  return (
    <Card className="border-border/50 hover:shadow-2xl transition-all duration-300 hover:border-primary/30 group overflow-hidden bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">{company}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSave}
                className={`p-2.5 rounded-lg transition-all duration-300 flex-shrink-0 ${
                  isSaved
                    ? "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-lg scale-110"
                    : "hover:bg-muted text-muted-foreground hover:text-accent"
                }`}
              >
                <Heart className={`w-5 h-5 transition-all ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">{description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm group/item">
                <MapPin className="w-4 h-4 text-primary group-hover/item:text-primary transition-colors" />
                <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                  {location}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm group/item">
                <DollarSign className="w-4 h-4 text-secondary group-hover/item:text-secondary transition-colors" />
                <span className="text-muted-foreground group-hover/item:text-foreground transition-colors truncate">
                  {salary}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm group/item">
                <Briefcase className="w-4 h-4 text-accent group-hover/item:text-accent transition-colors" />
                <Badge variant="secondary" className="text-xs">
                  {type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm group/item">
                <Clock className="w-4 h-4 text-muted-foreground group-hover/item:text-foreground transition-colors" />
                <span className="text-muted-foreground group-hover/item:text-foreground transition-colors text-xs">
                  {posted}
                </span>
              </div>
            </div>
          </div>

          <Link href={`/dashboard/user/job/${id}`} className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
              Apply Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
