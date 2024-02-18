import './theme-config.css'
import type { Metadata } from 'next'
import './globals.css'
import { Zen_Dots } from 'next/font/google'
import { Navbar } from './components'
import AuthProvider from '../auth/Provider'
import QueryClientProvider from '@/QueryClientProvider'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import { theme } from '@/antd.config'

const zen = Zen_Dots({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400'],
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
    <html lang="en" className={zen.variable}>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <QueryClientProvider>
              <AuthProvider>
                <Navbar />
                <main className="w-full max-w-5xl self-center m-auto">
                  {children}
                </main>
              </AuthProvider>
            </QueryClientProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
