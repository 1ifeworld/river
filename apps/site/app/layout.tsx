import '../styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
// import { helveticaNeue } from './fonts/fonts'
import { Analytics } from '@vercel/analytics/react'

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
    // className={`${helveticaNeue.variable}`}
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
