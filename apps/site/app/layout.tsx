import { Header, ThemeToggle, Footer } from '@/client'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '../styles/globals.css'
import { sfMono } from './fonts/fonts'
import { Providers } from './providers/providers'

export const metadata: Metadata = {
  title: 'River',
  description: 'Set information free',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sfMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster position="bottom-center" />
          <ThemeToggle />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
