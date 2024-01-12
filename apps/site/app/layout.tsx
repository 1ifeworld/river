import { Header, ThemeToggle } from '@/client'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '../styles/globals.css'
import { fragmentMono } from './fonts/fonts'
import { Providers } from './providers/providers'
import Script from 'next/script'
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

      <body>



        <Providers>
          <div className="py-3 px-5">
            <Header />
            {children}
            <Toaster position="bottom-center" />
            <ThemeToggle />
          </div>
          <Analytics />
        </Providers>
      </body>
      <Script async src="https://saturn.tech/widget.js#integration=4fa57944-e0f0-46f6-9c3e-f36c048cba01" />
    </html>
  )
}
