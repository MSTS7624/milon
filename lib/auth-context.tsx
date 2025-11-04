"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { DEMO_ACCOUNTS } from "./demo-accounts"

interface User {
  id: string
  name: string
  email: string
  type: "user" | "publisher"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string, type: "user" | "publisher") => boolean
  logout: () => void
  signup: (name: string, email: string, password: string, type: "user" | "publisher") => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("jobhub_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("[v0] Failed to load user from localStorage:", error)
      }
    }
    setMounted(true)
  }, [])

  const login = (email: string, password: string, type: "user" | "publisher"): boolean => {
    // Check against demo accounts
    const demoAccount = type === "user" ? DEMO_ACCOUNTS.user : DEMO_ACCOUNTS.publisher

    if (email === demoAccount.email && password === demoAccount.password) {
      const newUser: User = {
        id: type === "user" ? "user-1" : "publisher-1",
        name: demoAccount.name,
        email,
        type,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }
      setUser(newUser)
      localStorage.setItem("jobhub_user", JSON.stringify(newUser))
      return true
    }

    // For other emails, create a temporary user (for testing)
    if (email && password) {
      const newUser: User = {
        id: type === "user" ? "user-temp" : "publisher-temp",
        name: email.split("@")[0],
        email,
        type,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }
      setUser(newUser)
      localStorage.setItem("jobhub_user", JSON.stringify(newUser))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("jobhub_user")
  }

  const signup = (name: string, email: string, password: string, type: "user" | "publisher"): boolean => {
    if (name && email && password) {
      const newUser: User = {
        id: type === "user" ? `user-${Date.now()}` : `publisher-${Date.now()}`,
        name,
        email,
        type,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }
      setUser(newUser)
      localStorage.setItem("jobhub_user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, signup }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
