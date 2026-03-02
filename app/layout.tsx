import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MUS!C Travels and Holidays | Curated Travel Experiences',
  description:
    'Discover extraordinary travel experiences with MUS!C Travels and Holidays. From tropical getaways to cultural journeys, we craft unforgettable holiday packages worldwide.',
  keywords: ['travel', 'holidays', 'tours', 'vacation', 'music travels'],
  openGraph: {
    title: 'MUS!C Travels and Holidays',
    description: 'Curated travel experiences that move your soul.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#0e7490',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}

