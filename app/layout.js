import { Inter, } from 'next/font/google'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aggro Dashboard',
  description: 'Mircoservice dashboard for Aggro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + 'w-full h-full'}>
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
