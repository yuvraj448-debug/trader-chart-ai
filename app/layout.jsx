export const metadata = {
  title: 'Trader Chart AI',
  description: 'AI-powered chart analysis'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}