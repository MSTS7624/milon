"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Briefcase, Search, Moon, Sun, Heart, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { JobCard } from "@/components/job-card";
import { CollapsibleFilter, type FilterState } from "@/components/collapsible-filter";
import { ProfileMenu } from "@/components/profile-menu";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";

// টাইপ ডিফিনিশন যা JobCard এর সাথে মিলবে
type JobCardData = {
  id: number;
  title: string;
  company: string; // Required string
  location: string;
  salary: string;
  posted: string;
  type: string;
  description: string;
  saved: boolean;
};

export default function UserDashboardContent() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<JobCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    locations: [],
    salaryRange: [0, 150000],
  });
  const { theme, setTheme } = useTheme();

  // রিডাইরেক্ট লজিক
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  // এপিআই থেকে ডাটা ফেচিং
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://msts.live/tolet/jobs.php", { cache: 'no-store' });
        const data = await res.json();
        
        const jobsFromAPI: JobCardData[] = data.map((job: any) => ({
          id: Number(job.id),
          title: job.title || "Untitled Job",
          company: job.company || "JobHub Partner",
          location: job.location || "Remote",
          salary: job.salary || "Negotiable",
          posted: job.posted || "Recently",
          type: job.type || "Full Time",
          description: job.description || "",
          saved: false,
        }));
        setJobs(jobsFromAPI);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (!isLoggedIn) return null;

  const toggleSave = (id: number) => {
    setJobs(prev => prev.map((job) => (job.id === id ? { ...job, saved: !job.saved } : job)));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesJobType = filters.jobTypes.length === 0 || filters.jobTypes.includes(job.type);
    const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.location);
    
    return matchesSearch && matchesJobType && matchesLocation;
  });

  const savedJobsCount = jobs.filter((j) => j.saved).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/40 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">JobHub</h1>
                <p className="text-xs text-muted-foreground">Welcome, {user?.name || "Job Seeker"}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">{savedJobsCount}</span>
            </div>
            <LanguageSwitcher />
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg hover:bg-muted transition-all">
              {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-primary" />}
            </button>
            <ProfileMenu />
          </div>
        </div>
      </header>

      <div className="flex">
        <CollapsibleFilter onFilterChange={setFilters} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <div className="mb-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">Find Your Dream Job</h2>
              <p className="text-muted-foreground">Explore {filteredJobs.length} opportunities matching your criteria</p>
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
                  className="pl-12 bg-card/80 backdrop-blur-sm border-border/50 h-12 focus:ring-2 focus:ring-primary/50 transition-all" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="animate-spin w-10 h-10 text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">Fetching jobs...</p>
                </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  {...job} 
                  onSave={() => toggleSave(job.id)} 
                />
              ))
            ) : (
              <div className="text-center py-16 bg-card/30 rounded-2xl border border-dashed border-border">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold">No jobs found</p>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}