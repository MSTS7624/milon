"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    jobType: "full-time",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  console.log("Submitting Data:", formData);

  try {
    const res = await fetch("https://msts.live/tolet/post_job.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      mode: "cors",
    })

    const text = await res.text() // একবারে text পড়ো
    let data
    try {
      data = JSON.parse(text) // চেষ্টা করো JSON parse করতে
    } catch {
      throw new Error("Invalid JSON response from server: " + text)
    }

    if (data.success) {
      alert("✅ Job posted successfully!")
      window.location.href = "/dashboard/publisher"
    } else {
      alert("⚠️ Failed to post job: " + (data.message || "Unknown error"))
    }
  } catch (error: any) {
    console.error("Error posting job:", error)
    alert("❌ Something went wrong while posting the job. Check console for details.")
  } finally {
    setLoading(false)
  }
}




  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/dashboard/publisher" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a New Job</h1>
          <p className="text-muted-foreground">Fill in the details below to create a new job posting</p>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Provide comprehensive information about the position</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Senior React Developer" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Dhaka, Bangladesh" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input id="salary" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g., $80,000 - $120,000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground">
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the role..." rows={6} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="List required skills..." rows={4} required />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="gap-2">{loading ? "Posting..." : <><Save className="w-4 h-4" />Post Job</>}</Button>
                <Link href="/dashboard/publisher"><Button type="button" variant="outline">Cancel</Button></Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
