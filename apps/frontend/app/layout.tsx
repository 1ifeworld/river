import '../styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local'

// Font files can be colocated inside of `app`
const helveticaNeue = localFont({
  src: './my-font.woff2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'River',
  description: 'Set information free',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
