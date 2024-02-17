import '@radix-ui/themes/styles.css'
import './theme-config.css'
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from '../components'
import { Container, Theme } from '@radix-ui/themes'
import AuthProvider from '../auth/Provider'
import QueryClientProvider from '@/QueryClientProvider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'TrainFlex',
  description: 'Train and flex with your friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="violet" radius="large">
              <Navbar />
              <main className="p-5">
                <Container size="4">{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
