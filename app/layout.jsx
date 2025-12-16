import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Background from './components/Background'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Trader Chart AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <Background />
        {children}
      </body>
    </html>
  )
}