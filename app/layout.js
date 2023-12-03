import { Inter } from 'next/font/google'
import AppLayout from './\(dashboard\)/AppLayout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aggro Dashboard',
  description: 'Mircoservice dashboard for Aggro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + 'w-full'}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
