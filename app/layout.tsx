import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Choice Engine',
  description: 'Your Car Repair Copilot - Save money on auto repairs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="font-sans overflow-x-hidden">{children}</body>
    </html>
  )
}
