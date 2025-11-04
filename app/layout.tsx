'use client'

import React from "react"
import { useAuth } from "@/lib/auth-context"

export default function UserDashboardPage() {
  const { user, logout } = useAuth()

  if (!user) {
    return <div className="p-6 text-center">Loading user data...</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="mb-4">Email: {user.email}</p>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}
