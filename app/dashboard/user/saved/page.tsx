"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, DollarSign, Heart } from "lucide-react"

// Dummy saved jobs
const dummySavedJobs = [
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Solutions Inc",
    location: "Remote",
    salary: "$60,000 - $90,000",
    type: "Full Time",
    posted: "3 days ago",
  },
]

export default function SavedJobsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/dashboard/user"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Saved Jobs</h1>
          <p className="text-muted-foreground">Your bookmarked job opportunities</p>
        </div>

        <div className="space-y-4">
          {dummySavedJobs.map((job) => (
            <Card key={job.id} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <button className="p-2 rounded-lg bg-accent text-accent-foreground">
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    <p className="text-muted-foreground font-medium mb-3">{job.company}</p>

                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <Badge variant="secondary">{job.type}</Badge>
                      <span className="text-xs text-muted-foreground">{job.posted}</span>
                    </div>
                  </div>

                  <Link href={`/dashboard/user/job/${job.id}`}>
                    <Button className="w-full sm:w-auto">Apply Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
