"use client"

import dynamic from 'next/dynamic'
import { Loader2 } from "lucide-react"

// ssr: false নিশ্চিত করে যে এটি বিল্ড টাইমে এরর দিবে না
const PublisherDashboardContent = dynamic(
  () => import('@/components/PublisherDashboardContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading Dashboard...</span>
      </div>
    )
  }
)

export default function PublisherDashboard() {
  return <PublisherDashboardContent />
}