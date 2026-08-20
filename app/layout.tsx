import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-ibm' })

export const metadata: Metadata = {
  title: 'Gaurav Khetwal — Full-stack developer',
  description: 'A thoughtful full-stack developer building clear, useful software.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#e9edf2' }, { media: '(prefers-color-scheme: dark)', color: '#202733' }],
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
