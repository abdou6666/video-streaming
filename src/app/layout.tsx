import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']

})

export const metadata: Metadata = {
  title: 'Video Streaming App',
  description: 'Cool video streaming app that keeps in mind perforamnce 😊',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-200 overflow-x-hidden`}>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  )
}
