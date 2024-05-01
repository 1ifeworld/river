import { Header, ThemeToggle, Footer } from '@/client'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '../styles/globals.css'
import { sfMono } from './fonts/fonts'
import { Providers } from './providers/providers'
import NextTopLoader from 'nextjs-toploader'

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
          <NextTopLoader
            color="#B4B4B4"
            initialPosition={0.08}
            crawlSpeed={200}
            height={2.5}
            crawl={true}
            showSpinner={true}
            easing="linear"
            speed={200}
            shadow={false}
            template='<div class="bar" role="bar"><div class="peg"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
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
