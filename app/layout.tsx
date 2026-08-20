import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Manrope } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-ibm' })

export const metadata: Metadata = {
  title: 'Gaurav Khetwal — Full-stack developer',
  description: 'A calm, high-signal portfolio for Gaurav Khetwal, full-stack developer.',
}

export const viewport: Viewport = {
  themeColor: '#e9edf2',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var a=localStorage.getItem('gk-appearance');var d=a==='dark'||(a!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.appearance=d?'dark':'light';var p=localStorage.getItem('gk-preset');if(p)document.documentElement.dataset.theme=p;var c=localStorage.getItem('gk-accent');if(c)document.documentElement.style.setProperty('--accent-custom',c)}catch(e){}})()` }} /></head>
      <body className={`${manrope.variable} ${plex.variable}`}><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  )
}
