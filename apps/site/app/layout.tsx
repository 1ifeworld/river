import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import '../styles/globals.css'
import { fragmentMono } from './fonts/fonts'
import { Providers } from './providers'
import { Header } from '@/client'

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
    <html lang="en" className={`${fragmentMono.variable}`}>
      <body>
        <Providers>
          <div className='p-4'>     
          <Header />
          {children}
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
