"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, MessageSquare } from "lucide-react"

// Dummy applications data
const dummyApplications = [
  {
    id: 1,
    candidateName: "Ahmed Hassan",
    position: "Senior React Developer",
    appliedDate: "2 days ago",
    status: "new",
    email: "ahmed@example.com",
  },
  {
    id: 2,
    candidateName: "Fatima Khan",
    position: "Full Stack Developer",
    appliedDate: "3 days ago",
    status: "reviewing",
    email: "fatima@example.com",
  },
  {
    id: 3,
    candidateName: "Karim Ahmed",
    position: "Senior React Developer",
    appliedDate: "1 week ago",
    status: "shortlisted",
    email: "karim@example.com",
  },
]

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  reviewing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  shortlisted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/dashboard/publisher"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Applications</h1>
          <p className="text-muted-foreground">Review and manage job applications</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>All applications from candidates</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {dummyApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 mb-4 sm:mb-0">
                    <h3 className="font-semibold text-foreground mb-1">{app.candidateName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{app.position}</p>
                    <p className="text-xs text-muted-foreground">{app.email}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-0">
                    <div className="flex flex-col gap-2">
                      <Badge className={statusColors[app.status]}>{app.status}</Badge>
                      <span className="text-xs text-muted-foreground">{app.appliedDate}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <Download className="w-4 h-4" />
                        CV
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
