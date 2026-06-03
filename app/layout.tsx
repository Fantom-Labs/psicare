import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Psicare — Bem-Estar Emocional',
  description: 'Plataforma de monitoramento do bem-estar emocional que conecta pacientes e profissionais de saúde mental.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#5B4CF5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} bg-[#F8F7FF] antialiased`}>
        {children}
      </body>
    </html>
  )
}
