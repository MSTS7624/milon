"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Building2 } from "lucide-react"

// Dummy applications data
const dummyApplications = [
  {
    id: 1,
    jobTitle: "Senior React Developer",
    company: "Tech Innovations Ltd",
    appliedDate: "2 days ago",
    status: "reviewing",
    salary: "$80,000 - $120,000",
  },
  {
    id: 2,
    jobTitle: "Full Stack Developer",
    company: "Digital Solutions Inc",
    appliedDate: "1 week ago",
    status: "shortlisted",
    salary: "$60,000 - $90,000",
  },
  {
    id: 3,
    jobTitle: "UI/UX Designer",
    company: "Creative Agency Co",
    appliedDate: "2 weeks ago",
    status: "rejected",
    salary: "$40,000 - $60,000",
  },
]

const statusColors: Record<string, string> = {
  reviewing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  shortlisted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  accepted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
}

export default function ApplicationsPage() {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track the status of your job applications</p>
        </div>

        <div className="space-y-4">
          {dummyApplications.map((app) => (
            <Card key={app.id} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{app.jobTitle}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {app.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {app.appliedDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Badge className={statusColors[app.status]}>{app.status}</Badge>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
