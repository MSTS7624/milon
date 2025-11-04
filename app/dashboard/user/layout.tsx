"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "next-themes";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
