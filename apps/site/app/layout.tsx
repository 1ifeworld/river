import { Header, ThemeToggle } from '@/client'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import '../styles/globals.css'
import { sfMono } from './fonts/fonts'
import { Providers } from './providers/providers'
import Script from 'next/script'
import { useEffect } from 'react'

export const metadata: Metadata = {
  title: 'River',
  description: 'Set information free',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker/saturn-sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);

  return (
    <html lang="en" className={`${sfMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
          <Toaster position="bottom-center" />
          <ThemeToggle />
          <Analytics />
        </Providers>
      </body>
      <Script
        async
        src="https://saturn.tech/widget.js#integration=14b09943-4822-45b7-892d-a0150f577c33"
      />
    </html>
  );
}
