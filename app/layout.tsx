import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CursorProvider } from '@/components/cursor-provider'

// Runs before first paint so the correct theme class is already on
// <html> when content renders — no flash of the wrong theme.
const themeInitScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`

export const metadata: Metadata = {
  title: 'Tamilarasan Selvakumar — Software Engineer',
  description:
    'Portfolio of Tamilarasan Selvakumar, a full-stack Associate Software Engineer building fast, resilient web platforms with React, Rails, and the cloud.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SmoothScroll>
          <CursorProvider />
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
