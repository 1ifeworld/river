import { Header, ThemeToggle } from '@/client'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '../styles/globals.css'
import { fragmentMono } from './fonts/fonts'
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
    <html
      lang="en"
      className={`${fragmentMono.variable}`}
      suppressHydrationWarning
    >
      <body className="overscroll-none">
        <Providers>
          <div className="px-5">
            <Header />
            {children}
            <Toaster position="bottom-center" />
            <ThemeToggle />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
