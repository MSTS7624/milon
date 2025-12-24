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

  // Fetch job detail
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://msts.live/tolet/get_jobs.php`)

        if (!res.ok) throw new Error("Network response was not ok")

        const data = await res.json()
        // URL এর jobId এবং API এর id ম্যাচ করানো (String এ কনভার্ট করে)
        const selectedJob = data.find((j: any) => String(j.id) === String(jobId))
        
        if (selectedJob) setJob(selectedJob)
        else console.warn("Job not found for id:", jobId)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (jobId) fetchJob()
  }, [jobId])

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadedFile) return alert("Please upload your CV")
    if (!job) return alert("Job data not loaded yet")

    setSubmitting(true)
    const formData = new FormData()
    formData.append("job_id", job.id)
    formData.append("name", "User Name") // আপনি চাইলে এখানে ইনপুট ফিল্ড থেকে নাম নিতে পারেন
    formData.append("email", "user@example.com")
    formData.append("cover_letter", coverLetter)
    formData.append("cv", uploadedFile)

    try {
      const res = await fetch("https://msts.live/tolet/submit_application.php", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        alert("Application submitted successfully!")
        setShowApplyForm(false)
        setUploadedFile(null)
        setCoverLetter("")
      } else {
        alert("Failed to submit: " + (data.error || "Unknown error"))
      }
    } catch (err) {
      console.error(err)
      alert("Error submitting application. Check CORS or Network.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsAppShare = () => {
    if (!job) return
    const phone = job.companyPhone || "8801XXXXXXXXX" // ব্যাকআপ ফোন নম্বর
    const message = `Hi, I'm interested in the ${job.title} position at ${job.company}.`
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (loading) return <p className="text-center mt-20 text-muted-foreground">Loading job details...</p>
  if (!job) return <p className="text-center mt-20 text-muted-foreground">Job not found.</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b border-border/50 bg-card/40 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/dashboard/user" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Jobs
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white">
                <Briefcase className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{job.title}</h1>
                <p className="text-lg text-muted-foreground">{job.company}</p>
              </div>
            </div>
            <button onClick={() => setSaved(!saved)} className={`p-3 rounded-xl ${saved ? "text-red-500" : "text-muted-foreground"}`}>
              <Heart className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <InfoCard icon={<MapPin className="w-5 h-5 text-primary" />} label="Location" value={job.location} />
            <InfoCard icon={<DollarSign className="w-5 h-5 text-green-500" />} label="Salary" value={job.salary} />
            <InfoCard icon={<Clock className="w-5 h-5 text-orange-500" />} label="Posted" value={job.posted} />
            <InfoCard icon={<Users className="w-5 h-5 text-blue-500" />} label="Applicants" value={job.applicants || "0"} />
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setShowApplyForm(!showApplyForm)} className="gap-2">
              <Upload className="w-4 h-4" /> Apply Now
            </Button>
            <Button variant="outline" onClick={handleWhatsAppShare} className="gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader><CardTitle>Job Description</CardTitle></CardHeader>
          <CardContent><p className="whitespace-pre-line leading-relaxed">{job.description}</p></CardContent>
        </Card>

        {showApplyForm && (
          <ApplyForm 
            job={job} 
            coverLetter={coverLetter} 
            setCoverLetter={setCoverLetter} 
            uploadedFile={uploadedFile} 
            setUploadedFile={setUploadedFile} 
            handleSubmitApplication={handleSubmitApplication} 
            handleWhatsAppShare={handleWhatsAppShare} 
            submitting={submitting}
            setShowApplyForm={setShowApplyForm} // Props পাঠানো হলো
          />
        )}
      </main>
    </div>
  )
}

function InfoCard({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
      {icon}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

function ApplyForm({
  job,
  coverLetter,
  setCoverLetter,
  uploadedFile,
  setUploadedFile,
  handleSubmitApplication,
  handleWhatsAppShare,
  submitting,
  setShowApplyForm, // রিসিভ করা হলো
}: any) {
  return (
    <Card className="animate-in fade-in zoom-in duration-300">
      <CardHeader>
        <CardTitle>Apply for {job.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitApplication} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload CV (PDF/DOC)</label>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={(e) => e.target.files && setUploadedFile(e.target.files[0])} 
              className="w-full p-2 border rounded-md"
            />
            {uploadedFile && <p className="text-sm text-green-600 mt-1">Selected: {uploadedFile.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Cover Letter</label>
            <textarea 
              value={coverLetter} 
              onChange={(e) => setCoverLetter(e.target.value)} 
              className="w-full p-3 border rounded-md min-h-[100px]"
              placeholder="Why should we hire you?"
            />
          </div>
          <div className="flex gap-4">
            <Button type="submit" disabled={submitting} className="flex-1">
              {submitting ? "Submitting..." : "Submit"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowApplyForm(false)}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}