"use client";

import dynamic from 'next/dynamic';
import { Loader2 } from "lucide-react";

// ssr: false নিশ্চিত করে যে বিল্ড টাইমে কোনো এরর আসবে না
const UserDashboardContent = dynamic(
  () => import('@/components/UserDashboardContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-medium text-muted-foreground">Loading Dashboard...</h2>
        </div>
      </div>
    )
  }
);

export default function UserDashboardPage() {
  return <UserDashboardContent />;
}