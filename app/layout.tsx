// app/layout.tsx
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "next-themes";
import './globals.css'; // তোমার global CSS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
