import localFont from 'next/font/local';

export const helveticaNeue = localFont({
  src: [
    {
      path: './helvetica-neue/HelveticaNeue-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './helvetica-neue/HelveticaNeue-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './helvetica-neue/HelveticaNeue-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './helvetica-neue/HelveticaNeue-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica-neue',
});