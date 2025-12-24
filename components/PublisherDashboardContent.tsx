"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Briefcase, Plus, MoreVertical, Users, Eye, Trash2, Edit, LogOut, Menu, X, Moon, Sun, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { StatsCard } from "@/components/stats-card"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useAuth } from "@/lib/auth-context"

export default function PublisherDashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth() // এটি এখন নিরাপদে কাজ করবে
  const router = useRouter()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const res = await fetch("https://msts.live/tolet/get_jobs.php", {
          cache: 'no-store'
        })
        const data = await res.json()
        const formattedJobs = data.map((job: any) => ({
          id: job.id,
          title: job.title,
          location: job.location,
          salary: job.salary || job.salary_text,
          applications: parseInt(job.applications) || 0,
          views: parseInt(job.views) || 0,
          posted: job.posted || job.posted_at,
          status: job.status || "active",
        }))
        setJobs(formattedJobs)
      } catch (error) {
        console.error("Failed to fetch jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0)
  const totalViews = jobs.reduce((sum, job) => sum + job.views, 0)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors">
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
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">Profile Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static left-0 top-16 lg:top-0 w-64 h-[calc(100vh-4rem)] lg:h-screen bg-card border-r border-border transition-transform duration-300 z-30 overflow-y-auto`}>
          <nav className="p-6 space-y-2 h-full flex flex-col">
            <Link href="/dashboard/publisher" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
              <Briefcase className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/dashboard/publisher/post-job" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted text-foreground transition-colors">
              <Plus className="w-5 h-5" /> Post New Job
            </Link>
            <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full text-left font-medium">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Publisher Dashboard</h2>
            <p className="text-muted-foreground">Managing {jobs.length} active job listings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatsCard title="Active Jobs" value={jobs.length} subtitle="Live on platform" icon={<Briefcase className="w-5 h-5" />} />
            <StatsCard title="Total Applications" value={totalApplications} subtitle="Review pending" icon={<Users className="w-5 h-5" />} />
            <StatsCard title="Total Views" value={totalViews} subtitle="Visibility metric" icon={<Eye className="w-5 h-5" />} />
          </div>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Job Postings</CardTitle>
                <CardDescription>Directly from your database</CardDescription>
              </div>
              <Link href="/dashboard/publisher/post-job">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" /> Post Job
                </Button>
              </Link>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-primary mb-2" />
                  <p className="text-muted-foreground">Loading your jobs...</p>
                </div>
              ) : jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{job.salary}</Badge>
                          <Badge variant="outline">{job.posted}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex gap-4 text-sm">
                          <div className="flex items-center gap-1"><Eye className="w-4 h-4 text-muted-foreground" /><span className="text-foreground font-medium">{job.views}</span></div>
                          <div className="flex items-center gap-1"><Users className="w-4 h-4 text-muted-foreground" /><span className="text-foreground font-medium">{job.applications}</span></div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2 cursor-pointer"><Edit className="w-4 h-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive cursor-pointer"><Trash2 className="w-4 h-4" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground">No jobs posted yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}