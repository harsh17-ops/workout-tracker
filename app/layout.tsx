import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ElevateFit",
  description: "Luxury workout tracker",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="relative">
            {/* App chrome background with subtle vignette */}
            <div
              aria-hidden
              className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(16,185,129,0.10),transparent_60%),radial-gradient(800px_400px_at_10%_-10%,rgba(245,158,11,0.08),transparent_60%)]"
            />
            {children}
          </div>
        </ThemeProvider>
        {/* Analytics component remains unchanged */}
      </body>
    </html>
  )
}
