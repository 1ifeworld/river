import localFont from 'next/font/local'

export const sfMono = localFont({
  src: [
    {
      path: './sf-mono/SFMono-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './sf-mono/SFMono-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './sf-mono/SFMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './sf-mono/SFMono-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './sf-mono/SFMono-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './sf-mono/SFMono-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './sf-mono/SFMono-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './sf-mono/SFMono-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './sf-mono/SFMono-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './sf-mono/SFMono-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './sf-mono/SFMono-Heavy.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './sf-mono/SFMono-HeavyItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-sf-mono',
})
