"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Briefcase, Search, Moon, Sun, Heart } from "lucide-react"
import { useTheme } from "next-themes"
import { JobCard } from "@/components/job-card"
import { CollapsibleFilter, type FilterState } from "@/components/collapsible-filter"
import { ProfileMenu } from "@/components/profile-menu"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"

type Job = {
  id: number
  title: string
  company?: string
  location: string
  salary_text: string
  salary_min?: string
  salary_max?: string
  type?: string
  posted_at: string
  saved?: boolean
  description?: string
}

export default function UserDashboard() {
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [jobs, setJobs] = useState<Job[]>([])
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    locations: [],
    salaryRange: [0, 150000],
  })
  const { theme, setTheme } = useTheme()

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) router.push("/auth/login")
  }, [isLoggedIn, router])

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://msts.live/tolet/jobs.php")
        const data = await res.json()
        // Map API fields to Job type
        const jobsFromAPI: Job[] = data.map((job: any, index: number) => ({
          id: index + 1,
          title: job.title,
          company: job.company || "Unknown Company",
          location: job.location,
          salary_text: job.salary_text,
          salary_min: job.salary_min,
          salary_max: job.salary_max,
          type: job.type || "Full Time",
          posted_at: job.posted_at,
          saved: false,
          description: job.description || "",
        }))
        setJobs(jobsFromAPI)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }
    fetchJobs()
  }, [])

  if (!isLoggedIn) return null

  const toggleSave = (id: number) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, saved: !job.saved } : job)))
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company!.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesJobType = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type!)
    const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.location)

    return matchesSearch && matchesJobType && matchesLocation
  })

  const savedJobsCount = jobs.filter((j) => j.saved).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b border-border/50 bg-card/40 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  JobHub
                </h1>
                <p className="text-xs text-muted-foreground">Job Seeker</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{savedJobsCount}</span>
            </div>
            <LanguageSwitcher />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
            </button>
            <ProfileMenu />
          </div>
        </div>
      </header>

      <div className="flex">
        <CollapsibleFilter onFilterChange={setFilters} />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8 animate-slide-in-down">
            <div className="mb-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                Find Your Dream Job
              </h2>
              <p className="text-muted-foreground">
                Explore {filteredJobs.length} opportunities matching your criteria
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by job title, company, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-card/80 backdrop-blur-sm border-border/50 h-12 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} {...job} onSave={toggleSave} saved={jobs.find((j) => j.id === job.id)?.saved} />
              ))
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold text-foreground mb-2">No jobs found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
