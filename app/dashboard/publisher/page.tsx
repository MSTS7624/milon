"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Briefcase, Plus, MoreVertical, Users, Eye, Trash2, Edit, LogOut, Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { StatsCard } from "@/components/stats-card"
import { LanguageSwitcher } from "@/components/language-switcher"

// Dummy job data
const dummyJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    location: "Dhaka, Bangladesh",
    salary: "$80,000 - $120,000",
    applications: 24,
    views: 1250,
    posted: "2 days ago",
    status: "active",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    location: "Remote",
    salary: "$60,000 - $90,000",
    applications: 18,
    views: 890,
    posted: "5 days ago",
    status: "active",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Dhaka, Bangladesh",
    salary: "$40,000 - $60,000",
    applications: 12,
    views: 650,
    posted: "1 week ago",
    status: "active",
  },
]

export default function PublisherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme, setTheme } = useTheme()

  const totalApplications = dummyJobs.reduce((sum, job) => sum + job.applications, 0)
  const totalViews = dummyJobs.reduce((sum, job) => sum + job.views, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground hidden sm:block">JobHub</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Company Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static left-0 top-16 lg:top-0 w-64 h-[calc(100vh-4rem)] lg:h-screen bg-card border-r border-border transition-transform duration-300 z-30 overflow-y-auto`}
        >
          <nav className="p-6 space-y-2">
            <Link
              href="/dashboard/publisher"
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
            >
              <Briefcase className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/publisher/post-job"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
            >
              <Plus className="w-5 h-5" />
              Post New Job
            </Link>
            <Link
              href="/dashboard/publisher/applications"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground transition-colors"
            >
              <Users className="w-5 h-5" />
              Applications
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Company Name</h2>
            <p className="text-muted-foreground">Manage your job postings and applications</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Active Jobs"
              value={dummyJobs.length}
              subtitle="Currently posted"
              icon={<Briefcase className="w-5 h-5" />}
            />
            <StatsCard
              title="Total Applications"
              value={totalApplications}
              subtitle="Across all jobs"
              icon={<Users className="w-5 h-5" />}
            />
            <StatsCard
              title="Total Views"
              value={totalViews}
              subtitle="Job listings viewed"
              icon={<Eye className="w-5 h-5" />}
            />
          </div>

          {/* Jobs List */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Job Postings</CardTitle>
                <CardDescription>Manage and track your active job listings</CardDescription>
              </div>
              <Link href="/dashboard/publisher/post-job">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Post Job
                </Button>
              </Link>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {dummyJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 mb-4 sm:mb-0">
                      <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{job.salary}</Badge>
                        <Badge variant="outline">{job.posted}</Badge>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-0">
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground font-medium">{job.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground font-medium">{job.applications}</span>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Eye className="w-4 h-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
