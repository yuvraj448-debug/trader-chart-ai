import './globals.css'
import Background from './components/Background'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata = {
  title: 'Trader Chart AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="relative">
        {/* STAR BACKGROUND */}
        <Background />

        {/* APP CONTENT */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}