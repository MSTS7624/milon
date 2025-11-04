"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Heart,
  Upload,
  MessageCircle,
  FileText,
  Briefcase,
  Clock,
  Users,
} from "lucide-react"

export default function JobDetailPage() {
  const params = useParams()
  const jobId = params.id

  const [job, setJob] = useState<any>(null)
  const [saved, setSaved] = useState(false)
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [coverLetter, setCoverLetter] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch job detail safely
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`https://msts.live/tolet/get_jobs.php`)

        if (!res.ok) {
          console.error("Network response was not ok", res.status)
          setLoading(false)
          return
        }

        const text = await res.text()
        console.log("Raw API response:", text)

        if (!text) {
          console.warn("Empty response from API")
          setLoading(false)
          return
        }

        const data = JSON.parse(text)
        const selectedJob = data.find((j: any) => j.id.toString() === jobId)
        if (selectedJob) setJob(selectedJob)
        else console.warn("Job not found for id:", jobId)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [jobId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadedFile) return alert("Please upload your CV")
    if (!job) return alert("Job data not loaded yet")

    setSubmitting(true)
    const formData = new FormData()
    formData.append("job_id", job.id)
    formData.append("name", "Your Name")
    formData.append("email", "youremail@example.com")
    formData.append("cover_letter", coverLetter)
    formData.append("cv", uploadedFile)

    try {
      const res = await fetch("https://msts.live/tolet/submit_application.php", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Network response not ok")
      const data = await res.json()

      if (data.success) {
        alert("Application submitted successfully!")
        setShowApplyForm(false)
        setUploadedFile(null)
        setCoverLetter("")
      } else {
        alert("Failed to submit application: " + (data.error || "Unknown error"))
      }
    } catch (err) {
      console.error(err)
      alert("Error submitting application")
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsAppShare = () => {
    if (!job) return
    if (!job.companyPhone) return alert("Company phone not available")

    const message = `Hi, I'm interested in the ${job.title} position at ${job.company}. I've uploaded my CV through JobHub. Please review my application.`
    const whatsappUrl = `https://wa.me/${job.companyPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
      message
    )}`
    window.open(whatsappUrl, "_blank")
  }

  if (loading) return <p className="text-center mt-20 text-muted-foreground">Loading job details...</p>
  if (!job) return <p className="text-center mt-20 text-muted-foreground">Job not found.</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/40 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/dashboard/user"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Job Header */}
        <div className="mb-8 animate-slide-in-up">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <Briefcase className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground">{job.title}</h1>
                  <p className="text-lg text-muted-foreground">{job.company}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSaved(!saved)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                saved
                  ? "bg-accent text-accent-foreground shadow-lg scale-110"
                  : "hover:bg-muted text-muted-foreground hover:shadow-md"
              }`}
            >
              <Heart className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Job Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <InfoCard icon={<MapPin className="w-5 h-5 text-primary flex-shrink-0" />} label="Location" value={job.location} />
            <InfoCard icon={<DollarSign className="w-5 h-5 text-secondary flex-shrink-0" />} label="Salary" value={job.salary} />
            <InfoCard icon={<Clock className="w-5 h-5 text-accent flex-shrink-0" />} label="Posted" value={job.posted} />
            <InfoCard icon={<Users className="w-5 h-5 text-tertiary flex-shrink-0" />} label="Applicants" value={job.applicants} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              onClick={() => setShowApplyForm(!showApplyForm)}
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
            >
              <Upload className="w-4 h-4" />
              Apply Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsAppShare}
              className="gap-2 hover:bg-green-50 dark:hover:bg-green-950 border-green-200 dark:border-green-800 bg-transparent"
            >
              <MessageCircle className="w-4 h-4" />
              Share on WhatsApp
            </Button>
          </div>
        </div>

        {/* Job Description */}
        <Card className="border-border/50 mb-8 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <p className="text-foreground whitespace-pre-line leading-relaxed">{job.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Apply Form */}
        {showApplyForm && <ApplyForm job={job} coverLetter={coverLetter} setCoverLetter={setCoverLetter} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} handleSubmitApplication={handleSubmitApplication} handleWhatsAppShare={handleWhatsAppShare} submitting={submitting} />}
      </main>
    </div>
  )
}

// Reusable InfoCard
function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
      {icon}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

// Apply Form Component
function ApplyForm({
  job,
  coverLetter,
  setCoverLetter,
  uploadedFile,
  setUploadedFile,
  handleSubmitApplication,
  handleWhatsAppShare,
  submitting,
}: any) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUploadedFile(e.target.files[0])
  }

  return (
    <Card className="border-border/50 animate-scale-in shadow-xl">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50">
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Apply for this Position
        </CardTitle>
        <CardDescription>Upload your CV and submit your application</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmitApplication} className="space-y-6">
          {/* CV Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">Upload CV</label>
            <div className="relative">
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" id="cv-upload" />
              <label
                htmlFor="cv-upload"
                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  {uploadedFile ? (
                    <>
                      <p className="text-foreground font-semibold">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <p className="text-muted-foreground font-medium">Drag and drop your CV here or click to browse</p>
                      <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, DOC, DOCX</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-foreground">
              Cover Letter (Optional)
            </label>
            <textarea
              id="message"
              placeholder="Tell us why you're interested in this position..."
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* WhatsApp Option */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-muted-foreground mb-3">After submitting, you can also reach out via WhatsApp:</p>
            <Button type="button" variant="outline" onClick={handleWhatsAppShare} className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white border-0 font-semibold">
              <MessageCircle className="w-4 h-4" />
              Send WhatsApp Message
            </Button>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={submitting} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg">
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowApplyForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
