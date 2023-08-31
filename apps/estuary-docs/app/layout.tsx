import '../styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SideNav } from '../components/client';
import { Header } from '../components/server';
import { Flex } from '@river/design-system';

const helveticaNeue = localFont({
  src: '../public/fonts/HelveticaNeue.woff2',
  display: 'swap',
  weight: '400',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'Estuary - River',
  description: 'Design system for River',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={helveticaNeue.className}>
        <Header />
        <Flex>
          <SideNav />
          <span className='p-8'>{children}</span>
        </Flex>
      </body>
    </html>
  );
}
