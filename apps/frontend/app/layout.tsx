import '../styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { helveticaNeue } from './fonts/fonts'
import { Sidebar } from '../components/client'
import { Grid } from '@river/design-system'
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
          <Grid className="grid-flow-col auto-cols-auto">
            <aside className='max-w-210'>
              <Sidebar />
            </aside>
            <div>{children}</div>
            <Analytics />
          </Grid>
        </Providers>
      </body>
    </html>
  )
}
