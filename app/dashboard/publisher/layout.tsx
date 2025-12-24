"use client"; // এটি অবশ্যই দিবেন যেন ক্লায়েন্ট সাইড প্রোভাইডার কাজ করে

import React from "react";
import { AuthProvider } from "@/lib/auth-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="dashboard-wrapper">
      {/* ড্যাশবোর্ডের সব পেজকে AuthProvider দিয়ে মুড়িয়ে দিন */}
      <AuthProvider>
        {children}
      </AuthProvider>
    </section>
  );
}