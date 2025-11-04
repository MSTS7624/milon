"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Briefcase,
  Users,
  TrendingUp,
  ArrowRight,
  Moon,
  Sun,
  Sparkles,
  CheckCircle2,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function Home() {
  const [userType, setUserType] = useState<"user" | "publisher" | null>(null)
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b border-border/50 bg-card/40 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110">
              <Briefcase className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                JobHub
              </h1>
              <p className="text-xs text-muted-foreground">Premium Job Portal</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-lg hover:bg-muted transition-all duration-200 hover:shadow-md"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-slide-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6 hover:border-primary/50 transition-all">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Premium Job Portal
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Find Your Perfect Job Opportunity
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Connect with top companies and discover career opportunities that match your skills and aspirations
          </p>

          {/* Account Type Selection */}
          {!userType ? (
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-scale-in">
              <Card
                className="flex-1 max-w-sm cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-primary/20 hover:border-primary/50 hover:scale-105 group bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden"
                onClick={() => setUserType("user")}
              >
                <div className="h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Job Seeker</CardTitle>
                  <CardDescription>Find and apply for jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse job listings, apply with CV, and track applications
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Browse thousands of jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Save your favorites</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Track applications</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="flex-1 max-w-sm cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-secondary/20 hover:border-secondary/50 hover:scale-105 group bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden"
                onClick={() => setUserType("publisher")}
              >
                <div className="h-1 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center mb-3 group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all">
                    <TrendingUp className="w-7 h-7 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Employer</CardTitle>
                  <CardDescription>Post jobs and hire talent</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Post job listings, manage applications, and build your team
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>Post unlimited jobs</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>Manage applications</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      <span>View analytics</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up">
              <Link href={userType === "user" ? "/auth/signup?type=user" : "/auth/signup?type=publisher"}>
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105 transition-all"
                >
                  Create Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href={userType === "user" ? "/auth/login?type=user" : "/auth/login?type=publisher"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-muted bg-transparent hover:scale-105 transition-all"
                >
                  Sign In
                </Button>
              </Link>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => setUserType(null)}
                className="hover:scale-105 transition-all"
              >
                Back
              </Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="border-border/50 hover:shadow-2xl transition-all duration-300 hover:border-primary/30 group bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Thousands of Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access a wide range of job opportunities across various industries and roles
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-2xl transition-all duration-300 hover:border-secondary/30 group bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gradient-to-br group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Top Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect with leading organizations looking for talented professionals
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:shadow-2xl transition-all duration-300 hover:border-accent/30 group bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:to-accent/20 transition-all">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Career Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advance your career with opportunities that match your skills and goals
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border/50 bg-card/40 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground">JobHub</h3>
              </div>
              <p className="text-sm text-muted-foreground">Your gateway to career opportunities</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Browse Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> My Applications
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Employers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-secondary transition-colors flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Post a Job
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary transition-colors flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Manage Jobs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 JobHub. All rights reserved. | Premium Job Portal</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
