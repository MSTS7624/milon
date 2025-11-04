"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Briefcase, ArrowLeft, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { DEMO_ACCOUNTS } from "@/lib/demo-accounts"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = (searchParams.get("type") || "user") as "user" | "publisher"
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const demoAccount = type === "user" ? DEMO_ACCOUNTS.user : DEMO_ACCOUNTS.publisher

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const success = login(email, password, type)

    if (success) {
      setTimeout(() => {
        router.push(type === "user" ? "/dashboard/user" : "/dashboard/publisher")
      }, 500)
    } else {
      setError("Invalid email or password")
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail(demoAccount.email)
    setPassword(demoAccount.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8 text-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="border-border">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">JobHub</h1>
            </div>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>{type === "user" ? "Sign in as a Job Seeker" : "Sign in as an Employer"}</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg flex items-gap-2 gap-2">
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input border-border"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Account Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3 font-semibold">Demo Account</p>
              <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-3 mb-3 space-y-1">
                <p className="text-xs text-foreground">
                  <span className="font-semibold">Email:</span> {demoAccount.email}
                </p>
                <p className="text-xs text-foreground">
                  <span className="font-semibold">Password:</span> {demoAccount.password}
                </p>
              </div>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleDemoLogin} type="button">
                Use Demo Account
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href={`/auth/signup?type=${type}`} className="text-primary hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
