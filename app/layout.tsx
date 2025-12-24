// app/layout.tsx
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "next-themes";
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // এখানে suppressHydrationWarning যোগ করা হয়েছে
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}