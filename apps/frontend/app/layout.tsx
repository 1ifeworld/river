import '../styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { helveticaNeue } from './fonts/fonts'
import { SidebarOrDrawer } from '@/client'
import { Grid, Debug } from '@river/estuary'
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
    <html lang="en" className={`${helveticaNeue.variable}`}>
      <body>
        <Providers>
          <Grid className="w-screen grid-cols-1 md:grid-cols-[auto,1fr]">
            <SidebarOrDrawer />
            {children}
            <Analytics />
          </Grid>
        </Providers>
      </body>
    </html>
  )
}
