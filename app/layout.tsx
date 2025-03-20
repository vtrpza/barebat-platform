import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/shared/AuthProvider'
import { BuilderProvider } from '@/components/builder/BuilderProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'BAREBAT - Plataforma de Sites para Bar e Bat Mitzvah',
  description: 'Crie um site incrível para seu Bar ou Bat Mitzvah com nossa plataforma intuitiva e moderna.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans`}>
        <BuilderProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </BuilderProvider>
      </body>
    </html>
  )
} 